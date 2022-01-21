const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profilePic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter required details");
  }

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await userModel.create({
    name,
    email,
    password,
    profilePic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await userModel
    .find(keyword)
    .find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { authUser, registerUser, allUsers };
