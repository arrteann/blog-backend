const { v4: uuid4 } = require("uuid");
const User = require("../models/user");

const users = [
  {
    id: "u1",
    email: "check@gmail.com",
    password: "password",
  },
];

const getUsers = async (req, res, next) => {
  const users = await User.find();

  res.json(users);
};

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  const user = new User({ email, password });

  await user.save();

  res.status(201).json({ user: newUser });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user || user.password !== password) {
    res.json({ message: "Email or password was wrong" });
  } else {
    res.json({ message: "loged in", user: validUser });
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
