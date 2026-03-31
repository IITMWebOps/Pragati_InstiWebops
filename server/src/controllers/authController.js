const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check existing
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "student",
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. create token 
    const token = jwt.sign(
      {
        id: user._id,        
        role: user.role,     
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.me = async (req, res) => {
  try {
    // req.user comes from middleware
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};