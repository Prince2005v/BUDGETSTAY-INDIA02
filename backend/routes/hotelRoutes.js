import express from "express";
import { createHotel, getHotels } from "../controllers/hotelController.js";

const router = express.Router();

router.post("/", createHotel);
router.get("/", getHotels);

export default router;
