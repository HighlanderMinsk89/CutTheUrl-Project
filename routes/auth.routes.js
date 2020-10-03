const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = Router();
const User = require("../models/User");

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "incorrect email").isEmail(),
    check("password", "min num characters is 6").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect credentials",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "This email is already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "User has been created" });
    } catch (e) {
      console.log(e.message);
      res
        .status(500)
        .json({ message: "Something went wrong with registration" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Enter correct email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect credentials when logging",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ message: "The user with this email is not registered" });

      const isPassMatch = await bcrypt.compare(password, user.password);

      if (!isPassMatch) res.status(400).json({ message: "Incorrect password" });

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "Something went wrong with logging" });
    }
  }
);

module.exports = router;
