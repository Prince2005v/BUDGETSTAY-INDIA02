import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

const router = express.Router();

/* ==============================
TEMP OTP STORE (in-memory)
================================ */
let emailOtpStore = {};

/* ==============================
SEND EMAIL OTP
POST /auth/send-otp
================================ */
router.post("/send-otp", async (req, res) => {
try {
const { email } = req.body;


if (!email) {
  return res.status(400).json({ message: "Email is required" });
}

// Generate 6 digit OTP
const otp = Math.floor(100000 + Math.random() * 900000).toString();
emailOtpStore[email] = otp;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "BudgetStay Email Verification",
  text: `Your OTP is ${otp}`,
});

res.json({ message: "OTP sent to email" });


} catch (err) {
res.status(500).json({ message: err.message });
}
});

/* ==============================
REGISTER WITH OTP
POST /auth/register
================================ */
router.post("/register", async (req, res) => {
try {
const { name, email, password, otp } = req.body;


// Verify OTP
if (emailOtpStore[email] !== otp) {
  return res.status(400).json({ message: "Invalid or expired OTP" });
}

delete emailOtpStore[email];

const exists = await User.findOne({ email });
if (exists) {
  return res.status(400).json({ message: "Email already exists" });
}

const hashedPassword = await bcrypt.hash(password, 10);

await User.create({
  name,
  email,
  password: hashedPassword,
});

res.status(201).json({ message: "User registered successfully" });


} catch (err) {
res.status(500).json({ message: err.message });
}
});

/* ==============================
LOGIN
POST /auth/login
================================ */
router.post("/login", async (req, res) => {
try {
const { email, password } = req.body;


const user = await User.findOne({ email });
if (!user) {
  return res.status(400).json({ message: "Invalid credentials" });
}

const match = await bcrypt.compare(password, user.password);
if (!match) {
  return res.status(400).json({ message: "Invalid credentials" });
}

const token = jwt.sign(
  { id: user._id, role: user.role || "user" },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

res.json({
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role || "user",
  },
});


} catch (err) {
res.status(500).json({ message: err.message });
}
});

export default router;
