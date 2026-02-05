import express from "express";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { hotel, room, userName, userPhone, checkIn, checkOut } = req.body;

    const roomData = await Room.findById(room);
    if (!roomData) {
      return res.status(404).json({ message: "Room not found" });
    }

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const nights = (outDate - inDate) / (1000 * 60 * 60 * 24);

    if (nights <= 0) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    const conflict = await Booking.findOne({
      room,
      checkIn: { $lt: outDate },
      checkOut: { $gt: inDate },
    });

    if (conflict) {
      return res
        .status(409)
        .json({ message: "Room already booked for these dates" });
    }

    const totalPrice = nights * roomData.pricePerNight;

    const booking = await Booking.create({
      hotel,
      room,
      userName,
      userPhone,
      checkIn: inDate,
      checkOut: outDate,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; // 🔥 THIS LINE FIXES EVERYTHING
