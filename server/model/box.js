const mongoose = require("mongoose");

const boxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: false,
  },
  image: {
    preview: { type: String, required: true },
    thumb: { type: String, required: true },
    original: { type: String, required: true },
  },
  weapons: [
    {
      drop_rate: {
        type: Number,
        required: true,
      },
      weapon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "weaponDb",
      },
    },
  ],
});

const boxDb = mongoose.model("boxDb", boxSchema);

module.exports = boxDb;
