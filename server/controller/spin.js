const userDb = require("../model/user");
const boxDb = require("../model/box");
const dropsDb = require("../model/drops");
const inventoryDb = require("../model/inventory");
const spinService = require("../services/spin");

exports.roulete = async (req, res) => {
  try {
    const boxId = req.params.id;
    const box = await boxDb.findById(boxId).populate("weapons.weapon category");
    const user = await userDb.findById(req.user._id).populate("inventory");
    const newWallet = user.inventory.wallet - box.price;
    const weapons = spinService.order(box.weapons)
    const round = spinService.roulete(weapons, "misc");
    const itemGot = spinService.generateItem(round.at(-1));
    itemGot.user = req.user._id;
    const drop = new dropsDb(itemGot);
    drop.save(drop).then(async (dropData) => {
      const inventory = await inventoryDb.findById(user.inventory._id);
      const drops = inventory.drops;
      drops.push(dropData._id);
      await inventoryDb.findByIdAndUpdate(user.inventory._id, {
        drops,
        wallet: newWallet,
      });
      const dropComplete = await dropsDb
        .findById(dropData._id)
        .populate("weapon");
      res.status(200).send({
        status: 200,
        data: {
          round,
          dropData: dropComplete,
        },
      });
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: err,
    });
  }
};

exports.selldrop = async (req, res) => {
  try {
    const drop = await dropsDb.findById(req.params.id).populate("weapon");
    const user = await userDb.findById(req.user._id).populate("inventory");
    const newWallet = user.inventory.wallet + drop.weapon.item_price[drop.type];
    await inventoryDb.findByIdAndUpdate(user.inventory._id, {
      wallet: newWallet,
    });
    let userDrops = user.inventory.drops;
    userDrops = userDrops.filter((dropItem) => String(dropItem) !== String(drop._id));
    await inventoryDb.findByIdAndUpdate(user.inventory._id, {
      drops: userDrops,
    });
    await dropsDb.findByIdAndDelete(req.params.id);
    res.status(200).send({
      status: 200,
      data: {},
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: err,
    });
  }
};
