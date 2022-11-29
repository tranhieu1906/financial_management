const db = require("./DBconnect");

class Wallets {
  async showWallets() {
    let sql = "SELECT * FROM Wallets";
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
module.exports = Wallets;