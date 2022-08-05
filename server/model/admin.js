const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
  image: {
    preview: { type: String, required: true },
    thumb: { type: String, required: true },
    original: { type: String, required: true },
  },
});

const adminDb = mongoose.model("adminDb", adminSchema);

module.exports = adminDb;
