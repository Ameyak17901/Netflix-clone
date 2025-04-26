import { envVars } from "../config/envVars.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const protectedRoute = async (req, res, next) => {
  const token = req.cookies["jwt-netflix"];
  try {
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token found" });
    }

    const decoded = jwt.verify(token, envVars.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.id).select("-password -__v");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error" + error.message,
      });
  }
};
