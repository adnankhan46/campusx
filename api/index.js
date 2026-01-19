import express from "express";
import dotenv from "dotenv";
import http from 'http';
import cors from 'cors';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import setupSocket from './socket.js';
import bodyParser from "body-parser";
import morgan from "morgan"
import helmet from "helmet";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import { v4 as uuidv4 } from 'uuid';
import logger from "./utils/logger.js";
import config from "./utils/config.js";
// DODO webhook
import { dodoWebhook } from "./webhook/dodo.webhook.js";

/* old routes
 * import authRoutes from "./route/auth.route.js";
 * import PostRoutes from "./route/post.route.js";
 * import CommentRoutes from "./route/comment.route.js";
 import NotificationRoutes from "./route/notification.route.js";
*/

// import routes
import authRoutes from "../src/modules/auth/auth.routes.js";
import PostRoutes from "../src/modules/post/post.route.js";
import CommentRoutes from "../src/modules/comment/comment.route.js";
import NotificationRoutes from "../src/modules/notification/notification.route.js";

import opportunityRoutes from "./route/company.route.js";
import applicantRouter from "./route/applicant.route.js"
import companyRoutes from "./route/company.route.js";
import adminRoutes from "./route/admin.route.js";

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;
const httpserver = http.createServer(app);

// Socket.io (notification system)
setupSocket(httpserver);

// Security Middleware
app.use(helmet());
app.use(compression());
app.use(mongoSanitize());

// Request ID Tracking
app.use((req, res, next) => {
  req.id = uuidv4();
  res.setHeader('X-Request-Id', req.id);
  next();
});

// HTTP Request Logging
app.use(morgan((tokens, req, res) => {
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const status = parseInt(tokens.status(req, res));
  const time = tokens['response-time'](req, res);
  const requestId = req.id;
  
  const message = `${method} '${url}' - ${status} (${time}ms) [${requestId}]`;
  
  if (status >= 500) {
    logger.error(message);  // Server errors
  } else if (status >= 400) {
    logger.warn(message);   // Client errors
  } else {
    logger.info(message);   // Success responses
  }
  
  return null;
}));

// CORS Configuration
const TRUSTED_ORIGINS = [
  'http://localhost:5173',
  ...(process.env.FRONTEND_ORIGIN ? [process.env.FRONTEND_ORIGIN] : [])
];

app.use(cors({
  origin: TRUSTED_ORIGINS,
  credentials: true
}));

// DODO-PAYMENT
app.use("/webhook/dodo-payments", bodyParser.raw({ type: "*/*" }), dodoWebhook);
// DODO-PAYMENT
app.use(express.json());
app.use(cookieParser());


// Registered Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/comment", CommentRoutes);
app.use("/api/notification", NotificationRoutes);
app.use("/api/company", companyRoutes); 
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/applicants", applicantRouter);
app.use("/api/admin", adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  });
});

// ######################################### MongoDB Connection
const dbURI = config.MONGO;
if (!dbURI) {
  console.error('Error: MONGO environment variable is not defined.');
  process.exit(1);
}

if(process.env.NODE_ENV !== 'test') { 
  mongoose.connect(dbURI)
  .then(() => {
    // console.log("Connected to MongoDB");
    logger.info(`[CONNECTION]: MongoDB Connected`)
  })
  .catch((err) => {
    // console.error("MongoDB connection error:", err);
        logger.error(`[CONNECTION-ERR]: MongoDB Connected | ${err}`)

  });
}

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test Routes
app.get('/api/front', (req, res) => {
  res.json('Hello World!');
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Memory Usage (Development Only)
if (process.env.NODE_ENV !== 'production') {
  const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`;
  const memoryData = process.memoryUsage();
  const memoryUsage = {
    rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
    heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
    heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
    external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
  };
  logger.info(`[MEMORY]: ${JSON.stringify(memoryUsage)}`);
}

httpserver.listen(port, () => {
  // console.log(`Server is running on port ${port}`);
  logger.info(`[CONNECTION]: Server Connected at PORT ${port}`)
});
