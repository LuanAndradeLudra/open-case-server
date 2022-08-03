const mongoose = require("mongoose");

const weaponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    preview: { type: String, required: true },
    thumb: { type: String, required: true },
    original: { type: String, required: true },
  },
  item_type: {
    type: String,
    required: true,
  },
  item_rarity: {
    type: String,
    required: true,
  },
  item_price: {
    factory_new: {
      type: Number,
      required: true,
    },
    factory_new_st: {
      type: Number,
      required: true,
    },
    minimal_wear: {
      type: Number,
      required: true,
    },
    minimal_wear_st: {
      type: Number,
      required: true,
    },
    field_tested: {
      type: Number,
      required: true,
    },
    field_tested_st: {
      type: Number,
      required: true,
    },
    well_worn: {
      type: Number,
      required: true,
    },
    well_worn_st: {
      type: Number,
      required: true,
    },
    battle_scarred: {
      type: Number,
      required: true,
    },
    battle_scarred_st: {
      type: Number,
      required: true,
    },
  },
});

const weaponDb = mongoose.model("weaponDb", weaponSchema);

module.exports = weaponDb;
