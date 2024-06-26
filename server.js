const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// dot config
dotenv.config();
const app = express();

// configuration

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// For mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/blood_bank")
  .then(() => {
    console.log("Connection to database");
  })
  .catch((err) => {
    console.log("Connection failed!");
  });

// routes

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));

// port
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
