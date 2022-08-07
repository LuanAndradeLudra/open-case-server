const categoriesDb = require("../model/categories");
const boxDb = require("../model/box");

exports.find = (req, res) => {
  categoriesDb
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
  categoriesDb
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
exports.listbox = async (req, res) => {
  try {
    const finalCategories = [];
    const categories = await categoriesDb.find();
    for (let i = 0; i < categories.length; i++) {
      let categorie = {
        ...categories[i]._doc,
        boxes: [],
      };
      const boxesResult = await boxDb
        .find({
          category: categorie._id,
        })
        .populate("weapons.weapon");
      if (boxesResult.length) {
        categorie.boxes = boxesResult;
      }
      finalCategories.push(categorie);
    }
    const allBoxes = await boxDb.find();
    finalCategories.push({ name: "Todas", boxes: allBoxes });
    res.status(200).send({
      status: 200,
      data: finalCategories,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: err,
    });
  }
};

exports.create = async (req, res) => {
  const name = req.body.name;
  if (name) {
    try {
      const exists = await categoriesDb.findOne({
        name,
      });
      if (!exists) {
        const categorie = new categoriesDb({
          name,
        });
        categorie
          .save(categorie)
          .then((data) => {
            res.status(200).send({
              status: 200,
              data,
            });
          })
          .catch((err) => {
            throw err;
          });
      } else throw "Já existe uma categoria com esse nome!";
    } catch (err) {
      res.status(500).send({
        status: 500,
        error: err,
      });
    }
  } else {
    res.status(500).send({
      status: 500,
      error: "Dados insuficientes para cadastro de categoria!",
    });
  }
};

exports.update = async (req, res) => {
  const name = req.body.name;
  const id = req.params.id;
  if (name && id) {
    try {
      const exists = await categoriesDb.findOne({
        name,
        _id: { $ne: id },
      });
      if (!exists) {
        categoriesDb.findByIdAndUpdate(id, { name }).then((data) => {
          res.status(200).send({
            status: 200,
            data,
          });
        });
      } else throw "Já existe uma categoria com esse nome!";
    } catch (err) {
      res.status(500).send({
        status: 500,
        error: err,
      });
    }
  } else {
    res.status(500).send({
      status: 500,
      error: "Dados insuficientes para atualização de categoria!",
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const boxes = await boxDb.find({
        category: id,
      });
      boxes.forEach(async (box) => {
        await boxDb.findByIdAndUpdate(box._id, {
          category: null,
        });
      });
      await categoriesDb.findByIdAndDelete(id);
      res.status(200).send({
        status: 200,
      });
    } catch (err) {
      res.status(500).send({
        status: 500,
        error: err,
      });
    }
  } else {
    res.status(500).send({
      status: 500,
      error: "Dados insuficientes para remoção de categoria!",
    });
  }
};
