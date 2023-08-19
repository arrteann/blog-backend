const bcrypt = require("bcryptjs");

const User = require("../models/user");

const salt = "";

const getUsers = async (req, res, next) => {
  const users = await User.find();

  res.json(users);
};

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({ email, password: hashedPassword });

  await user.save();

  res.status(201).json({ user: user });
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
    res.json({ message: "loged in", user: user });
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
