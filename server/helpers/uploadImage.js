const { dirname } = require("path");
const sharp = require("sharp");
const createImageName = require("../helpers/createImageName");

module.exports = async function uploadImage(image, path) {
  const root = dirname(require.main.filename).toString();
  const unique = new Date().getTime();
  const uploads = {};
  try {
    let imageName = createImageName(unique, image.mimetype, "original");
    let imagePath = `${root}/public/images/${path}/${imageName}`;
    await sharp(image.data).toFile(imagePath);
    uploads.original = imageName;
    imageName = createImageName(unique, image.mimetype, "1920");
    imagePath = `${root}/public/images/${path}/${imageName}`;
    await sharp(image.data).resize(1920).toFile(imagePath);
    uploads.preview = imageName;
    imageName = createImageName(unique, image.mimetype, "800");
    imagePath = `${root}/public/images/${path}/${imageName}`;
    await sharp(image.data).resize(800).toFile(imagePath);
    uploads.thumb = imageName;

    return uploads;
  } catch (err) {
    return false;
  }
};
