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
  name: {
    type: String,
    required: true,
  },
  image: {
    preview: { type: String, required: true },
    thumb: { type: String, required: true },
    original: { type: String, required: true },
  },
  inventory:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "inventoryDb",
    required: false,
  },
});

const userDb = mongoose.model("userDb", userSchema);

module.exports = userDb;
