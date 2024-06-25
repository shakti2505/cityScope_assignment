import mongoose from "mongoose";
import creatorProfileModal from "./creatorsProfile.js";

const slotSchema = new mongoose.Schema({
  time: String,
  booked: { type: Boolean, default: false },
});

const offeringSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    ratings: {
      type: Number,
    },
    price: {
      type: Number,
    },
    duration: {
      type: String,
    },
    courseDetails: {
      type: String,
      trim: true,
    },
    slots: {
      type: [slotSchema],
    },
    crreatorName: {
      type: String,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: creatorProfileModal,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const offeringModal = mongoose.model("offering", offeringSchema);
export default offeringModal;
