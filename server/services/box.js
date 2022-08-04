const validator = require("../helpers/validator");

class BoxService {
  validateCreate(data) {
    if (
      validator.isNotEmpty(data.name) &&
      validator.isNotEmpty(data.price) &&
      validator.isNotEmpty(data.image) &&
      validator.isNotEmpty(data.weapons)
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
  validateUpdate(data){
    if (
      validator.isNotEmpty(data.name) &&
      validator.isNotEmpty(data.price) &&
      validator.isNotEmpty(data.weapons)
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
  cleanWeapons(weapons){
    weapons = JSON.parse(weapons)
    weapons.forEach((weapon) => {
      weapon.drop_rate = validator.cleanRate(weapon.drop_rate)
    })
    return weapons
  }
}

module.exports = new BoxService()
