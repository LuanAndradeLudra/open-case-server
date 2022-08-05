const userDb = require("../model/user");
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          res.status(401).send({
            status: 401,
            error: "Autorização inválida!",
          });
        } else {
          if (decoded) {
            userDb.findById(decoded.user._id).then((user) => {
              if (user) {
                user.password = null;
                user.type = "user";
                req.user = user;
                next();
              } else res.sendStatus(401)
            });
          } else {
            res.sendStatus(401);
          }
        }
      }
    );
  } else {
    res.status(500).send({
      status: 500,
      error: "Necessário autorização!",
    });
  }
}

module.exports = authMiddleware;
