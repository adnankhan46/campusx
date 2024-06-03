import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./route/auth.route.js";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Allow credentials (cookies)
  
}));

// Routes
app.use("/api/auth", authRoutes);

app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internqal Server Error";
  return res.status(statusCode).json({
      success: false,
      message,
      statusCode
  })
})

// ################################################ MongoDB Connection
const dbURI = process.env.MONGO;

if (!dbURI) {
  console.error('Error: MONGO environment variable is not defined.');
  process.exit(1);
}

mongoose.connect(dbURI)
  .then(() => {
    console.log("Connected to MONGODB");
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.get('/api/front', (req, res) => {
  res.json('Hello World!');
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
