import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

// Allowed domain through CORS
const corsOptions = {
  origin: "http://localhost:5173/",
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server is running on PORT 5000");
});
