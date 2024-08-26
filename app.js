require("dotenv").config();
const express = require("express"); //import express pacakge
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

const app = express();
app.use(express.json());

const connectionString = process.env.CONNECTION_STRING;

async function dbConnect() {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to database");
  } catch (error) {
    console.log(error.message);
  }
}

dbConnect();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
