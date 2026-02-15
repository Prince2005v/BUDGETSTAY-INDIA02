import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import connectDB from "./config/db.js";

dotenv.config();


const app = express();

// DB Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

// MIDDLEWARES
app.use(express.json());
// app.use(cors({
//   origin: "https://budgetstay-india-02.vercel.app",
//   credentials: true
// }));
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  "https://budgetstay-india-02.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ROUTES
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

// ROOT
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

// PORT

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
console.log("MONGO_URI:", process.env.MONGO_URI);

