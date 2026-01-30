import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import hotelRoutes from "./routes/hotelRoutes.js";


dotenv.config();
connectDB();


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/hotels", hotelRoutes);
// Routes
app.use("/api/hotels", require("./routes/hotelRoutes"));

app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

