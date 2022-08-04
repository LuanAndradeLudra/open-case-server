class Validator {
  isNotEmpty(value) {
    if (value !== "" && value !== undefined && value !== null) return true;
    else return false;
  }

  cleanPrice(data) {
    data = data.replaceAll("R$ ", "");
    return data;
  }

  cleanPriceObj(data) {
    Object.keys(data).forEach((key) => {
      data[key] = data[key].replaceAll("R$ ", "");
    });
    return data;
  }

  cleanRate(value) {
    let cleanValue = value.replaceAll("%", "").replaceAll(" ", "");
    cleanValue = parseFloat(cleanValue);
    return cleanValue;
  }
}

module.exports = new Validator();
