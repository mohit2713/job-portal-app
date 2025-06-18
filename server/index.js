const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");

require("dotenv").config(); // Load .env variables
connectDB(); // Connect MongoDB

const app = express();
const PORT = process.env.PORT || 5050;

// ✅ Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🎉 Job Portal API is running!");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
