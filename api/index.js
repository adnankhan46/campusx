import express from "express";
import dotenv from "dotenv";
import authRoutes from "./route/auth.route.js"




dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

//Routes
app.use("/api/auth",authRoutes);


app.get('/', (req, res) => {
  res.json({message:'Hello World!'});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});