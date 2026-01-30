import express from "express";
const router = express.Router();
import { getHotels, createHotel } from "../controllers/hotelController.js";

router.get("/", getHotels);
router.post("/", createHotel);

export default router; // 'module.exports' ki jagah ye likhna hai