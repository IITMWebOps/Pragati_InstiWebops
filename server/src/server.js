require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const testRoutes = require("./routes/testRoutes");
const materialRoutes = require("./routes/materialRoutes");

const app = express();
connectDB();

app.use(
  cors({
    origin: "*", // Allow all origins; adjust as needed for production
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Team Pragati API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/materials", materialRoutes);

// Listen only when running directly (local dev); Vercel imports this file as a module
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app;
