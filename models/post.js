const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postSchema = new schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);
