const userDb = require("../model/user");
const inventoryDb = require("../model/inventory");

exports.find = (req, res) => {
  userDb
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
  userDb
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

exports.inventory = (req, res) => {
  inventoryDb
    .findById(req.user.inventory._id)
    .populate({
      path: "drops",
      populate: {
        path: "weapon",
      },
    })
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
