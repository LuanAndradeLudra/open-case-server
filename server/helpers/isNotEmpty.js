module.exports = function isNotEmpty(value) {
  if (value !== "" && value !== undefined && value !== null) return true;
  else return false;
};
