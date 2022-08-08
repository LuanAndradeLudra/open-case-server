const LootTable = require("./loot");

class SpinService {
  roulete(box, type = "default") {
    const loot = new LootTable();
    box.forEach((item) => {
      loot.add(item, item.drop_rate);
    });
    return type === "default"
      ? this.generateRoundDefault(loot)
      : this.generateRoundMisc(box, loot);
  }
  generateRoundDefault(loot) {
    const round = [];
    for (let i = 0; i <= 50; i++) {
      round.push(loot.choose());
    }
    return round;
  }

  generateRoundMisc(weapons, loot) {
    const round = [];
    while (round.length < 50) {
      const randomNumber = Math.floor(Math.random() * weapons.length);
      round.push(weapons[randomNumber]);
    }
    round.slice(0, -1);
    round.push(loot.choose());
    return round;
  }

  generateItem(item) {
    const float = this.getFloat();
    const statTrak = this.getStatTrak();
    return {
      weapon: item.weapon._id,
      type: statTrak ? `${float}_st` : float,
      statTrak,
    };
  }

  getFloat() {
    const generatedRandom = Math.random().toPrecision(3);
    if (generatedRandom <= 0.07) return "factory_new";
    else if (generatedRandom <= 0.15) return "minimal_wear";
    else if (generatedRandom <= 0.38) return "field_tested";
    else if (generatedRandom <= 0.45) return "well_worn";
    else return "battle_scarred";
  }

  getStatTrak() {
    const generatedRandom = Math.random() * 100;
    if (generatedRandom <= 10) return true;
    else return false;
  }

  order(weapons) {
    weapons = weapons.sort((a,b) => (a.drop_rate > b.drop_rate) ? 1 : ((b.drop_rate > a.drop_rate) ? -1 : 0))
    return weapons
  }
}

module.exports = new SpinService();
