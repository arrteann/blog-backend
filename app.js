const express = require("express");

const app = express();

const postRoutes = require("./routes/post-routes");
const usersRoutes = require("./routes/users-routes");

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);

app.listen(5000);
