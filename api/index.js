// server.js
import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import opportunityRoutes from "./route/company.route.js";
import authRoutes from "./route/auth.route.js";
import PostRoutes from "./route/post.route.js";
import CommentRoutes from "./route/comment.route.js";
import NotificationRoutes from "./route/notification.route.js";
import applicantRouter from "./route/applicant.route.js"
import cookieParser from "cookie-parser";
import companyRoutes from "./route/company.route.js";
import http from 'http';
import setupSocket from './socket.js'; // Import the socket setup

dotenv.config();
console.log("MONGO env value:", process.env.MONGO);

const app = express();
const port = process.env.PORT || 3000;
const httpserver = http.createServer(app);

// Initialize Socket.io
setupSocket(httpserver);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/comment", CommentRoutes);
app.use("/api/notification", NotificationRoutes);
app.use("/api/company", companyRoutes); 
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/applicants", applicantRouter);
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

// MongoDB Connection
const dbURI ="mongodb+srv://garvthakre:BIjacT1V9ciA6PLW@campusx-bitd.8wry4cg.mongodb.net/?retryWrites=true&w=majority&appName=campusx-bitd";
if (!dbURI) {
  console.error('Error: MONGO environment variable is not defined.');
  process.exit(1);
}

mongoose.connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
  app.get('/api/front', (req, res) => {
    res.json('Hello World!');
  });
  
  app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
  });
  
   // check memory usage
  
   const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`;
  
   const memoryData = process.memoryUsage();
   
   const memoryUsage = {
     rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
     heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
     heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
     external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
   };
   
   console.log(memoryUsage);
// Start server
httpserver.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
