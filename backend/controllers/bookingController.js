import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";

export const createBooking = async (req, res) => {
  try {
    const { hotelId, userName, checkIn, checkOut } = req.body;

    if (!hotelId || !userName || !checkIn || !checkOut) {
      return res.status(400).json({ message: "All fields required" });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // date validation
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    if (outDate <= inDate) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const nights =
      (outDate - inDate) / (1000 * 60 * 60 * 24);

    const totalPrice = nights * hotel.pricePerNight;

    // ⚠️ Overlapping booking check
    const existingBooking = await Booking.findOne({
      hotel: hotelId,
      status: "confirmed",
      $or: [
        {
          checkIn: { $lt: outDate },
          checkOut: { $gt: inDate },
        },
      ],
    });

    if (existingBooking) {
      return res
        .status(409)
        .json({ message: "Hotel already booked for selected dates" });
    }

    const booking = await Booking.create({
      hotel: hotelId,
      userName,
      checkIn: inDate,
      checkOut: outDate,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Booking failed" });
  }
};
