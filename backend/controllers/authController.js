import User from "../models/User.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// Store OTP with expiry
let emailOtpStore = {};

// Send Email OTP
export const sendEmailOtp = async (req, res) => {
try {
const { email } = req.body;


// Check if user already exists
const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(400).json({ message: "Email already registered" });
}

const otp = Math.floor(100000 + Math.random() * 900000).toString();

// Save OTP with 5 min expiry
emailOtpStore[email] = {
  otp,
  expiresAt: Date.now() + 5 * 60 * 1000,
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

await transporter.sendMail({
  from: `"BudgetStay" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "BudgetStay Verification OTP",
  text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
});

res.json({ message: "OTP sent successfully" });


} catch (error) {
console.log("Email Error:", error);
res.status(500).json({ message: "Failed to send OTP" });
}
};

// Signup
export const signup = async (req, res) => {
try {
const { name, email, password, otp } = req.body;


const record = emailOtpStore[email];

if (!record) {
  return res.status(400).json({ message: "OTP not requested" });
}

if (record.expiresAt < Date.now()) {
  delete emailOtpStore[email];
  return res.status(400).json({ message: "OTP expired" });
}

if (record.otp !== otp) {
  return res.status(400).json({ message: "Invalid OTP" });
}

// OTP verified → remove it
delete emailOtpStore[email];

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
  name,
  email,
  password: hashedPassword,
});

await newUser.save();

res.status(201).json({ message: "User registered successfully" });


} catch (err) {
res.status(500).json({ error: err.message });
}
};
