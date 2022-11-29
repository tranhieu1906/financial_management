const db = require("./DBconnect");

class Wallets {
  async showWallets(id) {
    let sql = `SELECT * FROM Wallets where userId = ${id}`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
}
module.exports = new Wallets();