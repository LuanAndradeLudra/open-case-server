const adminDb = require("../model/admin");
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err) {
          res.status(401).send({
            status: 401,
            error: "Autorização inválida!",
          });
          } else {
            try {
              const user = await  adminDb.findById(decoded.user._id)
              if (user) {
                user.password = null;
                req.user = user;
                next();
              } else throw "Autorização negada!";
            } catch (err) {
              res.status(401).send({
                status: 401,
                error: err,
              });
            }
        }
      }
    );
  } else {
    res.status(500).send({
      status: 500,
      error: "Necessário token autorização!",
    });
  }
}

module.exports = authMiddleware;
