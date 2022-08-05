const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  image: {
    preview: { type: String, required: true },
    thumb: { type: String, required: true },
    original: { type: String, required: true },
  },
});

const userDb = mongoose.model("userDb", userSchema);

module.exports = userDb;
