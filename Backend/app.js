import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import foodRoutes from './Routes/foodRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();
const app = express();
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173", 
  credentials:true
}))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is my Home Page");
});

app.use('/api/food', foodRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Connected to db & Server ${process.env.PORT} ma chaleko xa hai`),
    );
  })
  .catch((err) => console.error(err));
