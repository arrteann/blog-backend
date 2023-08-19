const express = require("express");
const mongoose = require("mongoose");

const app = express();

const postRoutes = require("./routes/post-routes");
const usersRoutes = require("./routes/users-routes");

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/blog")
  .then((_) => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
