const weaponDb = require("../model/weapon");
const weaponService = require("../services/weapon");
const uploadImage = require("../helpers/uploadImage");
const deleteImage = require("../helpers/deleteImage");
const validator = require("../helpers/validator")

exports.create = async (req, res) => {
  const data = req.body;
  if (req.files && req.files.image) data.image = req.files.image;
  const validate = weaponService.validateCreate(data);
  if (validate.next) {
    data.item_price = JSON.parse(data.item_price);
    data.item_price = validator.cleanPriceObj(data.item_price);
    const uploads = await uploadImage(req.files.image, "weapons");
    if (uploads) {
      const weapon = new weaponDb({
        name: data.name,
        image: uploads,
        item_type: data.item_type,
        item_rarity: data.item_rarity,
        item_price: data.item_price,
      });
      weapon
        .save(weapon)
        .then((data) => {
          res.status(200).send({
            status: 200,
            data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            status: 500,
            error: err,
          });
        });
    } else {
      res.status(500).send({
        status: 500,
        error: "Uploads failed!",
      });
    }
  } else {
    res.status(500).send({
      status: 500,
      error: validate.error,
    });
  }
};

exports.find = (req, res) => {
  weaponDb
    .findById(req.params.id)
    .then((data) => {
      res.status(200).send({
        status: 200,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        error: err,
      });
    });
};

exports.list = (req, res) => {
  weaponDb
    .find()
    .then((data) => {
      res.status(200).send({
        status: 200,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        error: err,
      });
    });
};

exports.update = async (req, res) => {
  const data = req.body;
  const validate = weaponService.validateUpdate(data, false);
  if (validate.next) {
    const id = data.id;
    delete data.id;
    data.item_price = JSON.parse(data.item_price);
    data.item_price = validator.cleanPriceObj(data.item_price);
    if (req.files) {
      const actualWeapon = await weaponDb.findById(id);
      if (deleteImage(actualWeapon.image, "weapons")) {
        const uploads = await uploadImage(req.files.image, "weapons");
        if (uploads) {
          data.image = uploads;
        }
      }
    }
    weaponDb
      .findByIdAndUpdate(id, { ...data })
      .then((data) => {
        res.status(200).send({
          status: 200,
          data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: 500,
          error: err,
        });
      });
  } else {
    res.status(500).send({
      status: 500,
      error: validate.error,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const weapon = await weaponDb.findById(id);
      await weaponDb.findByIdAndDelete(id);
      deleteImage(weapon.image, "weapons");
      res.status(200).send({
        status: 200,
      });
    } catch (e) {
      res.status(500).send({
        status: 500,
        error: "Houve um erro ao tentar deletar o weapon",
      });
    }
  } else {
    res.status(500).send({
      status: 500,
      error: "Dados insuficientes!",
    });
  }
};
