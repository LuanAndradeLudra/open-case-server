const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  weapon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "weaponDb",
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  factory_new: {
    type: Boolean,
    required: true,
  },
});

const inventory = mongoose.model("inventoryDb", inventorySchema);

module.exports = inventory;
