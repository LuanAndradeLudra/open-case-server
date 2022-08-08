const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  wallet: {
    type: Number,
    required: true,
  },
  drops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dropsDb",
      required: false,
    },
  ],
});

const inventory = mongoose.model("inventoryDb", inventorySchema);

module.exports = inventory;
