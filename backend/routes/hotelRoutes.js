import express from "express";
import {
  createHotel,
  getHotels,
  seedHotels
} from "../controllers/hotelController.js";

const router = express.Router(); // ✅ FIRST create router

router.post("/", createHotel);
router.get("/", getHotels);
router.post("/seed", seedHotels);

export default router;
