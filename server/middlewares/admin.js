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
              const admin = await  adminDb.findById(decoded.admin._id)
              if (admin) {
                admin.password = null;
                req.user = admin;
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
