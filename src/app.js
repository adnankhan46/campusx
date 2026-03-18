import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import { v4 as uuidv4 } from 'uuid';
import logger from "./shared/utils/logger.js";
import { NODE_ENV } from "./shared/utils/constants.js";

// DODO webhook
import { dodoWebhook } from "./modules/payments/webhook.controller.js";

// Routes (migrated modules)
import authRoutes from "./modules/auth/auth.routes.js";
import PostRoutes from "./modules/post/post.route.js";
import CommentRoutes from "./modules/comment/comment.route.js";
import NotificationRoutes from "./modules/notification/notification.route.js";
import companyRoutes from "./modules/company/company.routes.js";
import applicantRouter from "./modules/applicant/applicant.routes.js";
import opportunityRoutes from "./modules/opportunity/opportunity.routes.js";

// Old routes (not yet migrated)
import adminRoutes from "../api/route/admin.route.js";

export const app = express();

// ── Security Middleware ──────────────────────────────────────────────────────
app.use(helmet());
app.use(compression());
app.use(mongoSanitize());

// ── Request ID Tracking ──────────────────────────────────────────────────────
app.use((req, res, next) => {
  req.id = uuidv4();
  res.setHeader('X-Request-Id', req.id);
  next();
});

// ── HTTP Request Logging ─────────────────────────────────────────────────────
app.use(morgan((tokens, req, res) => {
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const status = parseInt(tokens.status(req, res));
  const time = tokens['response-time'](req, res);
  const requestId = req.id;

  const message = `${method} '${url}' - ${status} (${time}ms) [${requestId}]`;

  if (status >= 500) {
    logger.error(message);
  } else if (status >= 400) {
    logger.warn(message);
  } else {
    logger.info(message);
  }

  return null;
}));

// ── CORS ─────────────────────────────────────────────────────────────────────
const TRUSTED_ORIGINS = [
  'http://localhost:5173',
  ...(process.env.FRONTEND_ORIGIN ? [process.env.FRONTEND_ORIGIN] : [])
];

app.use(cors({
  origin: TRUSTED_ORIGINS,
  credentials: true
}));

// ── Body Parsers ─────────────────────────────────────────────────────────────
// DODO webhook needs raw body — must be registered before express.json()
app.use("/webhook/dodo-payments", bodyParser.raw({ type: "*/*" }), dodoWebhook);
app.use(express.json());
app.use(cookieParser());

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/comment", CommentRoutes);
app.use("/api/notification", NotificationRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/applicants", applicantRouter);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/admin", adminRoutes); // old — not yet migrated

// ── Health & Test Endpoints ──────────────────────────────────────────────────
import mongoose from "mongoose";

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/front', (req, res) => res.json('Hello World!'));
app.get('/', (req, res) => res.json({ message: 'Hello World!' }));

// ── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  });
});

// ── Silence logs in test env ─────────────────────────────────────────────────
if (process.env.NODE_ENV === NODE_ENV.TEST) {
  logger.silent = true;
}