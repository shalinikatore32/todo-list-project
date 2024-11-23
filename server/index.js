require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRoutes = require("./routes/todos");

const app = express();
const MONGODB_URL=process.env.MONGODB_URL;
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", todoRoutes);

// MongoDB Connection
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
