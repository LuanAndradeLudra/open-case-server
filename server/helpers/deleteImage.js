const { dirname } = require("path");
const fs = require("fs");

module.exports = function removeImage(images, path) {
  const root = dirname(require.main.filename).toString();
  try {
    Object.keys(images).forEach((key) => {
      fs.unlinkSync(`${root}/public/images/${path}/${images[key]}`);
    });
     
    return true;
  } catch (err) {
    return false;
  }
};
