const userDb = require("../model/user");
const inventoryDb = require("../model/inventory");
const authService = require("../services/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.me = (req, res) => {
  userDb
    .findById(req.user._id)
    .populate("inventory")
    .then((user) => {
      if (user) {
        user.password = null;
        res.status(200).send({
          status: 200,
          data: user,
        });
      } else
        res.status(401).send({
          status: 401,
          error: "Usuário inválido!",
        });
    });
};

exports.auth = async (req, res) => {
  const data = req.body;
  const validate = authService.validateLogin(data);
  if (validate.next) {
    try {
      const user = await userDb
        .findOne({
          email: data.email,
        })
        .populate("inventory")
        .catch((err) => console.log(err));
      if (user) {
        if (bcrypt.compareSync(data.password, user.password)) {
          user.password = null;
          const token = jwt.sign({ user }, process.env.JWT_SECRET);
          res.status(200).send({
            status: 200,
            token,
            data: user,
          });
        } else {
          throw "Usuário ou senha inválidos!";
        }
      } else throw "Usuário ou senha inválidos!";
    } catch (err) {
      res.status(401).send({
        status: 401,
        error: err,
      });
    }
  } else {
    res.status(500).send({
      status: 500,
      error: validate.error,
    });
  }
};

exports.create = async (req, res) => {
  const data = req.body;
  const validate = authService.validateCreate(data);
  if (validate.next) {
    try {
      const inventory = new inventoryDb({
        wallet: 500,
        drops: [],
      });
      inventory.save(inventory).then((inventoryData) => {
        const user = new userDb({
          name: data.name,
          email: data.email,
          password: bcrypt.hashSync(data.password),
          image: {
            original: "default.png",
            thumb: "default.png",
            preview: "default.png",
          },
          inventory: inventoryData._id,
        });
        user
          .save(user)
          .then((userData) => {
            user.password = null;
            res.status(200).send({
              status: 200,
              data: userData,
            });
          })
          .catch(async (err) => {
            await inventoryDb.findByIdAndDelete(inventoryData._id)
            res.status(401).send({
              status: 401,
              error: err,
            });
          });
      });
    } catch (err) {
      res.status(401).send({
        status: 401,
        error: err,
      });
    }
  } else {
    res.status(500).send({
      status: 500,
      error: validate.error,
    });
  }
};

exports.logout = (req, res) => {
  jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (!err) {
        res.status(200).send({
          status: 200,
          data: decoded,
        });
      } else {
        res.status(401).send({
          status: 401,
          error: "Usuário inválido!",
        });
      }
    }
  );
};
