const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // MongoDB connection function
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");

require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5050;

// ✅ Connect to MongoDB
connectDB(); // Will now use MONGO_URI from .env

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🎉 Job Portal API is running!");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
