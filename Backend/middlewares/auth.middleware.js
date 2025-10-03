const blacklistTokenModel = require("../models/blacklistToken.model");
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const jwt = require('jsonwebtoken');

// Auth for Normal Users
module.exports.authUser = async (req, res, next) => {
  try {
    let token;

    // Get token from cookies or Authorization header
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers["authorization"]) {
      const authHeader = req.headers["authorization"]; // "Bearer <token>"
      token = authHeader?.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check blacklist
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await userModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user; // attach user to request
    next();

  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Auth for Captains
module.exports.authCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check blacklist
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find captain
    const captain = await captainModel.findById(decoded._id).select("-password");
    if (!captain) {
      return res.status(401).json({ message: "Unauthorized: Captain not found" });
    }

    req.captain = captain; // attach captain
    next();

  } catch (err) {
    console.error("AuthCaptain error:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
