const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Signup route with email validation
router.post(
  "/signup",
  [
    check("email").isEmail().normalizeEmail(), // Validate email format
    check("password").isLength({ min: 5 }), // Validate password length
    check("repeatPassword").custom((value, { req }) => {
      // Check if repeatPassword matches password
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract email and password from request body
      const { email, password } = req.body;

      // Check if email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Encrypt password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      // Save user to the database
      await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Send token as response
      res.status(201).json({
        message: "User registered successfully",
        token: token,
      });
    } catch (error) {
      console.error("Error in signup route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post(
  "/login",
  [
    check("email").isEmail().normalizeEmail(), // Validate email format
    check("password").exists(), // Check if password exists
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract email and password from request body
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Compare password using bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Send token as response
      res.status(200).json({
        message: "Login successfully",
        token: token,
      });
    } catch (error) {
      console.error("Error in login route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);



module.exports = router;
