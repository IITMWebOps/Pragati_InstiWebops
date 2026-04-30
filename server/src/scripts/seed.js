// server/src/scripts/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("../models/Event");
const Test = require("../models/Test");
const Material = require("../models/Material");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected for seeding");

    // Clear existing data (optional during dev)
    await Promise.all([
      Event.deleteMany({}),
      Test.deleteMany({}),
      Material.deleteMany({}),
      User.deleteMany({}),
    ]);

    // Create an admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    const admin = await User.create({
      name: "Admin",
      email: "admin@iitm.ac.in",
      password: adminPassword,
      role: "admin",
    });

    console.log("Admin user:", admin.email, "password: admin123");

    // Sample events
    await Event.insertMany([
      {
        title: "UPSC Orientation",
        description: "Intro session for IITM students interested in UPSC.",
        date: new Date(),
        category: "Workshop",
      },
      {
        title: "Current Affairs Discussion",
        description: "Weekly discussion on The Hindu & Indian Express.",
        date: new Date(),
        category: "Study Group",
      },
    ]);

    // Sample tests
    await Test.insertMany([
      {
        title: "Polity Prelims Test 1",
        type: "Prelims",
        syllabus: "Constitutional Framework - Laxmikanth Ch 1-5",
        durationMinutes: 120,
        totalMarks: 200,
        link: "https://forms.gle/example-polity-test",
      },
    ]);

    // Sample materials
    await Material.insertMany([
      {
        title: "Polity Bluebook",
        type: "Bluebook",
        subject: "Polity",
        description: "Internal club notes for Polity.",
        url: "https://drive.google.com/example-polity-bluebook",
      },
      {
        title: "NCERT Class 11 - India Physical Environment",
        type: "NCERT",
        subject: "Geography",
        description: "Reference NCERT for Geography basics.",
        url: "https://ncert.nic.in/textbook.php?legy1=0-6",
      },
    ]);

    console.log("Seeding completed.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
