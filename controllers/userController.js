const User = require("../models/user");

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .send({ status: "success", results: users.length, data: users });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};

// Add User
exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res
      .status(201)
      .send({ status: "success", message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res
      .status(200)
      .send({ status: "success", message: "User updated successfully" });
  } catch (error) {
    res.status(404).send({ status: "fail", message: "User Not Found" });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .send({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    res.status(404).send({ status: "fail", message: "User Not Found" });
  }
};
