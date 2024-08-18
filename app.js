const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");

const app = express();

// Middlewares
app.use(express.json());

const connectionString = "mongodb://localhost:27017/blog";

async function dbConnect() {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
}

dbConnect();

app.use("/api/v1/users", userRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
