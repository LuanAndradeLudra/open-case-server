const boxDb = require("../model/box");
const weaponDb = require("../model/weapon");

exports.create = (req, res) => {
  const box = new boxDb({
    name: "teste",
    price: 0.50,
    image: {
      preview: "fsa",
      original: "asf",
      thumb: "asf",
    },
    weapons: [
      {
        drop_rate: 1.500,
        weapon: "62ead56b082027d93d2bbf5c",
      },
      {
        drop_rate: 98.500,
        weapon: "62eaf4cd93dcca3cef125047",
      },
    ],
  });
  box.save(box);
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
  
