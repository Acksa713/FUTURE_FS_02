const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

router.post("/register", async (req, res) => {

  const { email, password } = req.body;

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const admin = new Admin({
    email,
    password: hashedPassword
  });

  await admin.save();

  res.json({
    message: "Admin Registered"
  });

});

router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const admin =
    await Admin.findOne({ email });

  if (!admin) {

    return res.status(400).json({
      message: "Admin Not Found"
    });

  }

  const validPassword =
    await bcrypt.compare(
      password,
      admin.password
    );

  if (!validPassword) {

    return res.status(400).json({
      message: "Wrong Password"
    });

  }

  const token = jwt.sign(
    { id: admin._id },
    "secretkey"
  );

  res.json({ token });

});

module.exports = router;