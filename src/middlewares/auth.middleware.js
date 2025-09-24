const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      console.warn("No token found in cookies");
      return res.status(401).json({ message: "Please Login" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    console.log("Cookies received");

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
