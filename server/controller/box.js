const boxDb = require("../model/box");
const weaponDb = require("../model/weapon");
const boxService = require("../services/box");
const validator = require("../helpers/validator");
const uploadImage = require("../helpers/uploadImage");
const deleteImage = require("../helpers/deleteImage");

exports.create = async (req, res) => {
  const data = req.body;
  if (req.files && req.files.image) data.image = req.files.image;
  const validate = boxService.validateCreate(data);
  if (validate.next) {
    data.weapons = boxService.cleanWeapons(data.weapons);
    data.price = validator.cleanPrice(data.price);
    const uploads = await uploadImage(req.files.image, "box");
    if (uploads) {
      const dataFinal = {
        name: data.name,
        price: data.price,
        image: uploads,
        weapons: data.weapons,
      };
      if (data.discount)
        dataFinal.discount = validator.cleanRate(data.discount);
      const box = new boxDb(dataFinal);
      box
        .save(box)
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

exports.list = (req, res) => {
  boxDb
    .find()
    .populate("weapons.weapon")
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

exports.find = (req, res) => {
  boxDb
    .findById(req.params.id)
    .populate("weapons.weapon")
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
  const validate = boxService.validateUpdate(data, false);
  if (validate.next) {
    const id = data.id;
    delete data.id;
    data.weapons = boxService.cleanWeapons(data.weapons);
    data.price = validator.cleanPrice(data.price);
    if (req.files) {
      const actualBox = await boxDb.findById(id);
      if (deleteImage(actualBox.image, "box")) {
        const uploads = await uploadImage(req.files.image, "box");
        if (uploads) {
          data.image = uploads;
        }
      }
    }
    if (data.discount) data.discount = validator.cleanRate(data.discount);
    boxDb
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
      const box = await boxDb.findById(id);
      await boxDb.findByIdAndDelete(id);
      deleteImage(box.image, "box");
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
