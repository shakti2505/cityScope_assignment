import mongoose from "mongoose";

const creatorProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  aboutMe: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    required: true,
    trim: true,
  },
  bookings: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  profilePic: {
    type: String,
    trim: true,
  },
});

const creatorProfileModal = mongoose.model(
  "Creators profile",
  creatorProfileSchema
);
export default creatorProfileModal;
