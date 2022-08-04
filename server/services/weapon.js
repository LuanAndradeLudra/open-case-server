const validator = require("../helpers/validator")

class WeaponService {
  validateCreate(data) {
    if (
      validator.isNotEmpty(data.name) &&
      validator.isNotEmpty(data.item_type) &&
      validator.isNotEmpty(data.item_rarity) &&
      validator.isNotEmpty(data.item_price) &&
      validator.isNotEmpty(data.image)
    ) {
      return {
        next: true,
      };
    } else
      return {
        next: false,
        error: "Dados insuficientes para criação!",
      };
  }

  validateUpdate(data) {
    if (
      validator.isNotEmpty(data.name) &&
      validator.isNotEmpty(data.item_type) &&
      validator.isNotEmpty(data.item_rarity) &&
      validator.isNotEmpty(data.item_price)
    ) {
      return {
        next: true,
      };
    } else
      return {
        next: false,
        error: "Dados insuficientes para edição!",
      };
  }
}

module.exports = new WeaponService();
