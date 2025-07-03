import User from "../models/user.model.ts";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.ts";

const signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      password,
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (fullName.length < 6 || fullName.length > 20) {
      return res.status(400).json({ message: "Full name must be between 6 and 20 characters." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    if (!/^\d{10,15}$/.test(phoneNumber)) {
      return res.status(400).json({ message: "Phone number must be 10 to 15 digits long." });
    }

    // Optional: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword
    });

    await newUser.save();

    generateToken(res, newUser._id);

    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      message: "User registered successfully",
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error in signup" });
  }
};

export { signup };
