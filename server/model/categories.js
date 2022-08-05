const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const categoriesDb = mongoose.model("categoriesDb", categoriesSchema);

module.exports = categoriesDb;
