import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./route/auth.route.js";



dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

//Routes
app.use("/api/auth",authRoutes);

// ################################################ MongoDB Connection
mongoose.connect(process.env.MONGO).then(()=>{
  console.log("Connected to MONGODB")
}).catch((err)=>{
  console.log(err);
});

app.get('/api/front', (req, res) => {
  res.json('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});