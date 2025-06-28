import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: /^\d{10,15}$/,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  bloodType: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  genotype: {
    type: String,
    required: true,
    enum: ["AA", "AS", "SS", "AC", "SC", "CC"],
  },
  sickleCellType: {
    type: String,
    required: true,
    enum: ["SS", "SC", "Sβ⁰", "Sβ⁺", "Other"],
  },
  emergencyContact: {
    name: { type: String, required: true },
    phone: { type: String, required: true, match: /^\d{10,15}$/ },
    relation: { type: String, required: true },
  },
  medicalHistory: {
    type: [String], // or a more structured array of objects
    default: [],
  },
  allergies: {
    type: [String],
    default: [],
  },
  medications: {
    type: [String],
    default: [],
  },
  lastCrisisDate: {
    type: Date,
  },
  isOnHydroxyurea: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
