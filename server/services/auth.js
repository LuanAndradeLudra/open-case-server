const validator = require("../helpers/validator");

class AuthService {
  validateCreate(data) {
    if (
      validator.isNotEmpty(data.email) &&
      validator.isEmail(data.email) &&
      validator.isLengthGreatOrEqual(data.password, 8) &&
      validator.isNotEmpty(data.password)
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
  validateLogin(data) {
    if (
      validator.isNotEmpty(data.email) &&
      validator.isEmail(data.email) &&
      validator.isLengthGreatOrEqual(data.password, 8) &&
      validator.isNotEmpty(data.password)
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
}

module.exports = new AuthService();
