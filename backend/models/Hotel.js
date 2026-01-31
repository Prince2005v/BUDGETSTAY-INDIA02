import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    amenities: [String],
    images: [String],
    description: String,
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
