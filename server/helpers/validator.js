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

  isLengthGreatOrEqual(value, length){
    return value.length >= length
  }

  cleanRate(value) {
    let cleanValue = value.replaceAll("%", "").replaceAll(" ", "");
    cleanValue = parseFloat(cleanValue);
    return cleanValue;
  }

  isEmail(value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  }
}

module.exports = new Validator();
