const User = require("../models/user");
const userSerivce = require("../services/userService");
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userSerivce.getAllUsers();
    res
      .status(200)
      .send({ status: "success", result: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const user = await userSerivce.createUser(req.body);
    res.status(201).send({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const updatedData = req.body;
  const appUser = req.user;
  try {
    const user = await userSerivce.updateUser(appUser, id, updatedData);

    return res.status(200).send({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    await userSerivce.deleteUser(id);
    return res
      .status(200)
      .send({ status: "success", message: "User delteted successfully!" });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await userSerivce.getUserById(id);

    return res.status(200).send({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
};
exports.getUserDetails = async (req, res, next) => {
  const id = req.params.id || req.user._id;
  try {
    const user = await userSerivce.getUserDetails(id);
    return res.status(200).send({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
};
