import User from "../models/user.model.ts";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.ts";
import res from "express/lib/response.js";

const signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      gender,
      dateOfBirth,
      password,
      bloodType,
      genotype,
      sickleCellType,
      emergencyContact,
      medicalHistory = [],
      allergies = [],
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !gender ||
      !dateOfBirth ||
      !password ||
      !bloodType ||
      !genotype ||
      !sickleCellType ||
      !emergencyContact?.name ||
      !emergencyContact?.phone ||
      !emergencyContact?.relation
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Check for existing user
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json({ message: "Email already exists." });
    // }

    // Validate lengths
    if (fullName.length < 6 || fullName.length > 20) {
      return res.status(400).json({ message: "Full name must be between 6 and 20 characters." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    if (!/^\d{10,15}$/.test(phoneNumber)) {
      return res.status(400).json({ message: "Phone number must be 10 to 15 digits long." });
    }

    if (!/^\d{10,15}$/.test(emergencyContact.phone)) {
      return res.status(400).json({ message: "Emergency contact phone must be 10 to 15 digits." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      gender,
      dateOfBirth,
      password: hashedPassword,
      bloodType,
      genotype,
      sickleCellType,
      emergencyContact,
      medicalHistory,
      allergies,
    });

    await newUser.save();

    // Set token cookie
    generateToken(res, newUser._id);

    // Respond
    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      message: "User registered successfully",
    });

  } catch (error) {
  if (error instanceof Error) {
    console.error("Error during signup:", error.message);
  } else {
    console.error("Unknown error during signup", error); // log full object without stringifying
  }

  res.status(500).json({ message: "Internal server error" });
}
}


export { signup };
