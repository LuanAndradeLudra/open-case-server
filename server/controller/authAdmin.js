const adminDb = require("../model/admin");
const authService = require("../services/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.me = (req, res) => {
  try {
    res.status(200).send({
      status: 200,
      data: req.user,
    });
  } catch (err) {
    res.status(401).send({
      status: 401,
      error: err,
    });
  }
};

exports.auth = async (req, res) => {
  const data = req.body;
  const validate = authService.validateLogin(data);
  if (validate.next) {
    try {
      const user = await adminDb.findOne({
        email: data.email,
      });
      if (user) {
        if (bcrypt.compareSync(data.password, user.password)) {
          user.password = null;
          const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES,
          });
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
      const user = new adminDb({
        email: data.email,
        password: bcrypt.hashSync(data.password),
        image: {
          original: "default.png",
          thumb: "default.png",
          preview: "default.png",
        },
      });
      user.save(user).then((data) => {
        res.status(200).send({
          status: 200,
          data,
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
