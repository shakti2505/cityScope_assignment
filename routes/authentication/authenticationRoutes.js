import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import userModal from "../../models/userModal.js";
import { authorization } from "../../middleware/authMiddleWare.js";
const router = express.Router();

const maxAge = 3 * 60 * 60;
const creatToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

// create user

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await userModal.findOne({ email: email });

    if (existingUser == null) {
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new userModal({
        name: name,
        email: email,
        password: hashPassword,
      });
      const savedUser = await newUser.save();
      let user = {
        name: savedUser.name,
        email: savedUser.email,
        _id: savedUser._id,
      };
      const token = creatToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      return res.status(201).json({ message: "registered successfully!" });
    } else {
      return res.status(200).json({ message: "email id already exist!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "all field are required" });
    }

    const existingUser = await userModal.findOne({ email: email });
    if (!existingUser) {
      return res.status(401).json({ message: "Email not found!" });
    }

    const passMatch = await bcrypt.compare(password, existingUser.password);
    if (passMatch) {
      // Destructure existingUser for simplicity
      const { name, email } = existingUser;
      // Create token
      const token = creatToken(existingUser._id);
      // Set JWT token in cookie
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

      return res.status(200).json({
        success: true,
        message: "Login successful!",
        loggedInUser: {
          name: name,
          email: email,
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

//logout
router.post("/logout", authorization, async (req, res) => {
  const UserId = req.userId;
  const loggedInUser = await userModal.findById(UserId);
  if (loggedInUser) {
    res.cookie("jwt", "", { expires: new Date(0) });
    res.status(200).json({ message: "logout Successfully" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
