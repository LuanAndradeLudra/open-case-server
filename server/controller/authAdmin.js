const adminDb = require("../model/admin");
const authService = require("../services/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.me = (req, res) => {
  res.status(200).send({
    status: 200,
    data: req.user,
  });
};

exports.auth = async (req, res) => {
  const data = req.body;
  const validate = authService.validateLogin(data);
  if (validate.next) {
    const user = await adminDb.findOne({
      email: data.email,
    });
    if (user) {
      if (bcrypt.compareSync(data.password, user.password)) {
        user.password = null;
        user.type = "admin";
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES,
        });
        res.status(200).send({
          status: 200,
          token,
          data: user,
        });
      } else {
        res.status(401).send({
          status: 401,
          error: "Usuário ou senha incorreto!",
        });
      }
    } else {
      res.status(401).send({
        status: 401,
        error: "Usuário ou senha incorreto!",
      });
    }
  } else {
    res.status(500).send({
      status: 500,
      error: validate.error,
    });
  }
};

exports.create = (req, res) => {
  const data = req.body;
  const validate = authService.validateCreate(data);
  if (validate.next) {
    const user = new adminDb({
      email: data.email,
      password: bcrypt.hashSync(data.password),
      image: {
        original: "default.png",
        thumb: "default.png",
        preview: "default.png",
      },
    });
    user
      .save(user)
      .then((data) => {
        data.password = null;
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
