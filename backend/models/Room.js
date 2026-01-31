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
      enum: ["Single", "Double", "Deluxe"],
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
