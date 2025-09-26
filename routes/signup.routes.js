const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");

// middleware
// const verifyJWT = (req, res, next) => {
//   const token = req.headers["authorization"];
//   if (!token) {
//     return res.status(401).json({ message: "No token provided." });
//   }
//   try {
//     // console.log(token);
//     const decodedToken = jwt.verify(token, JWT_SECRET);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     return res.status(402).json({ message: "Invalid Token" });
//   }
// };

// controller
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Server Error.", error });
  }
});

// router.get("/api/data", verifyJWT, (req, res) => {
//   res.json({ message: "Protected route" });
// });

module.exports = router;
