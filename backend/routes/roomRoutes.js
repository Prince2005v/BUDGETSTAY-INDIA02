import express from "express";
import Room from "../models/Room.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
