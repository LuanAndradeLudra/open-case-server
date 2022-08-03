const isNotEmpty = require("../helpers/isNotEmpty");

class WeaponService {
  validateCreate(data) {
    if (
      isNotEmpty(data.name) &&
      isNotEmpty(data.item_type) &&
      isNotEmpty(data.item_rarity) &&
      isNotEmpty(data.item_price) &&
      isNotEmpty(data.image)
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
      isNotEmpty(data.name) &&
      isNotEmpty(data.item_type) &&
      isNotEmpty(data.item_rarity) &&
      isNotEmpty(data.item_price)
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

  cleanPrice(data) {
    Object.keys(data).forEach((key) => {
      data[key] = data[key].replaceAll("R$ ", "");
    });
    return data;
  }
}

module.exports = new WeaponService();
