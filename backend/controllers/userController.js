const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerController = async function (req, res) {
  let { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    let user = await userModel.findOne({ email });
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    if (user)
      return res.status(409).json({ message: "You are already registered" });
    user = await userModel.create({
      username,
      email,
      password: hash,
    });
    let token = jwt.sign({ username, email }, process.env.JWT_KEY);
    res.cookie("token", token);
    res.status(201).json({ message: "Registration Successfull",token });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.loginController = async function (req, res) {
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "You are not registered" });
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign(
          { username: user.username, email },
          process.env.JWT_KEY
        );
        res.cookie("token", token);
        return res.status(200).json({ message: "You are logged in",token });
      } else {
        return res.status(401).json({ message: "You cannot login" });
      }
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.logoutController = function (req, res) {
  try {
    res.cookie("token", "");
    res.status(200).json({ message: "You are logged out" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getUserProfileController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
