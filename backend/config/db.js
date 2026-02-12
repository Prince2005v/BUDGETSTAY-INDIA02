import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  console.log("=> Creating new database connection");
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ Mongo connected");
  } catch (err) {
    console.log("❌ Mongo error", err);
    throw err;
  }
};

export default connectDB;
