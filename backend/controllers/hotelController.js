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
  try {
    const { city } = req.query;

    let query = {};

    if (city) {
      query.city = { $regex: city, $options: "i" };
    }

    const hotels = await Hotel.find(query);

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const seedHotels = async (req, res) => {
  try {
    await Hotel.deleteMany();

    const hotels = [
      {
        name: "Budget Inn Udaipur",
        city: "Udaipur",
        price: 999, // 'pricePerNight' ko 'price' kar diya (Frontend match)
        rating: 4.2,
        rooms: 20,
        // Unsplash ki images zyada reliable hoti hain testing ke liye
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
      },
      {
        name: "Ganga View Stay",
        city: "Rishikesh",
        price: 1299, // Same yahan bhi
        rating: 4.5,
        rooms: 15,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800"
      }
    ];

    const savedHotels = await Hotel.insertMany(hotels);
    res.status(201).json(savedHotels);
  } catch (error) {
    res.status(500).json({ message: "Seed failed" });
  }
};