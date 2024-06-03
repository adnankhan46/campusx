import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./route/auth.route.js";




dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173'
}));
// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);


// ################################################ MongoDB Connection
const dbURI = process.env.MONGO;
console.log (process.env.PORT)

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
