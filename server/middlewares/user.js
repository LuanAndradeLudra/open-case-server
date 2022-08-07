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
          req.user = decoded.user;
          next();
        }
      }
    );
  } else {
    res.status(500).send({
      status: 500,
      error: "Necessário token de autorização!",
    });
  }
}

module.exports = authMiddleware;
