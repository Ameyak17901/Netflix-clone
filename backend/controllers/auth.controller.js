import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { envVars } from "../config/envVars.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    // Validate input
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // check email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }
    // check password is valid
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // check if user already exists
    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const existingUserByUsername = await User.findOne({ username: username });

    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatars = [
      "avatar1.png",
      "avatar2.png",
      "avatar3.png",
      "avaatar.png",
    ];
    const image = avatars[Math.floor(Math.random() * avatars.length)];
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });
    await newUser.save();
    // generate jwt token
    generateTokenAndSetCookie(newUser.__id, res);
    return res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.error(`Error in signup: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error(`Error in logout: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.error(`Error in login: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function checkAuth(req, res) {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.error("Error is auth check controller");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
