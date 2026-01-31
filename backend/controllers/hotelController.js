import Hotel from "../models/Hotel.js";

// @desc   Create hotel
export const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Get all hotels
export const getHotels = async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
};
