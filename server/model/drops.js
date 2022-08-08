const mongoose = require("mongoose");

const dropsSchema = new mongoose.Schema({
  weapon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "weaponDb",
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  statTrak: {
    type: Boolean,
    required: true,
  },
});

const dropsDb = mongoose.model("dropsDb", dropsSchema);

module.exports = dropsDb;
