import express from "express";
import { authorization } from "../middleware/authMiddleWare.js";
import bookingModal from "../models/booking.js";
import offeringModal from "../models/offeringModal.js";
import { transport } from "../utilities/nodeMailer.js";

const router = express.Router();
// create booking
const sendMail = async (mailOptions) => {
  let info = await transport.sendMail(mailOptions);
  return info;
};

router.post("/createbooking", authorization, async (req, res) => {
    try {
      const {email, guest, slotDate, slotTime, courseId, creatorId, courseDetails } = req.body;
  
      if (!guest || !slotDate || !slotTime || !courseId || !creatorId || !courseDetails) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newBooking = new bookingModal({
        guest,
        slot: `${slotDate} ${slotTime}`,
        courseId,
        creatorId,
        courseDetails,
      });
  
      const savedBooking = await newBooking.save();
      if (savedBooking) {
        const course = await offeringModal.findById(courseId);
        
        if (!course) {
          return res.status(404).json({ message: "Course not found" });
        }
  
        const slotToUpdate = course.slots.find((item) => item.time === slotTime);
        if (slotToUpdate) {
          slotToUpdate.booked = true;
        } else {
          return res.status(404).json({ message: "Slot not found" });
        }
        
        await course.save();
        const mailOptions = {
          from: {
            name: "scholerhub",
            address: process.env.user,
          },
          to: email,
          subject: "Scholerhub course booking details",
          text: `Hi ${guest},\n\nYour booking is confirmed for ${course.title} at ${slotTime + "" + slotDate}. Booking Id: ${savedBooking._id}\n\nThank you for using ScholerHub!`,
          html: `
            <p>Hi ${guest},</p>
            <p>Your booking is confirmed for <strong>${slotDate}</strong> at <strong>${slotTime}</strong>.</p>
            <p>Details: ${course.courseDetails}</p>
            <p>Thank you for using scholerhub!</p>
          `,
        };
  
        const sentMail = await sendMail(mailOptions);
        return res.status(201).json(savedBooking);
      } else {
        return res.status(500).json({ message: "Failed to save booking" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
export default router;
