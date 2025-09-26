const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");

// middleware
const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken;
    console.log(req.user)
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

// controller
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "UserId or password mismatch." });
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
      const token = jwt.sign(
        { id: userExist._id, email: userExist.email },
        JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.status(201).json({ token, message: "Logged in successfully." });
    
   
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/me", verifyJWT, (req, res) => {
  res.json({ message: "Protected route" });
});

module.exports = router;
