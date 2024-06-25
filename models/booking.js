import mongoose from "mongoose";
import offeringModal from "./offeringModal.js";
import creatorProfileModal from "./creatorsProfile.js";

const bookingSchema = new mongoose.Schema(
  {
    guest: {
      type: String,
      required: true,
      trim: true,
    },
    slot: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: offeringModal,
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: creatorProfileModal,
      required: true,
    },
    courseDetails: Array,
  },
  {
    timestamps: true,
  }
);

const bookingModal = mongoose.model('bookings', bookingSchema);
export default bookingModal;