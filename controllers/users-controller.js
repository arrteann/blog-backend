const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  const users = await User.find();

  res.json(users);
};

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({ email, password: hashedPassword });

  await user.save();

  const token = await jwt.sign({ email: email }, "secret_key");

  res.status(201).json({ user: user, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  const validPassword = await bcrypt.compare(password, user.password);

  if (!user) {
    res.json({ message: "User not valid!" });
  } else if (!validPassword) {
    res.json({ message: "Password is wrong" });
  } else {
    const token = await jwt.sign({ email: user.email }, "secret_key");
    res.json({ message: "loged in", user: user, token });
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
