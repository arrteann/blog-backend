const { v4: uuid4 } = require("uuid");

const users = [
  {
    id: "u1",
    email: "check@gmail.com",
    password: "password",
  },
];

const getUsers = (req, res, next) => {
  res.json(users);
};

const signup = (req, res, next) => {
  const userID = uuid4();

  const { email, password } = req.body;

  const newUser = { id: userID, email, password };

  users.push(newUser);

  res.status(201).json({ user: newUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const validUser = users.find((user) => user.email === email);

  if (!validUser || validUser.password !== password) {
    res.json({ message: "Email or password was wrong" });
  } else {
    res.json({ message: "loged in", user: validUser });
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
