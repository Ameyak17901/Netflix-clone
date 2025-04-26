import jwt from "jsonwebtoken";
import { envVars } from "../config/envVars.js";

export function generateTokenAndSetCookie(id, res) {
  const token = jwt.sign({ id }, envVars.JWT_SECRET);

  res.cookie("jwt-netflix", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: envVars.NODE_ENV !== "development",
    samesite: "strict",
  });

  return token;
}
