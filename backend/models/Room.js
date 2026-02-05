import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// 🔥 THIS LINE WAS MISSING
const Room = mongoose.model("Room", roomSchema);

export default Room;
