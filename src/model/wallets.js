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
  async addWallet(wallet, id) {
    let sql = `INSERT INTO Wallets(userId,name,totalMoney) VALUES(${id},'${wallet.nameWallet}',${wallet.money})`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async addTransaction() {
    let sql = `INSERT INTO Transactions(userId,name,totalMoney) VALUES(${this.userId},'${this.nameTransaction}',${this.money})`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err
      });
  }
  async updateWallet(data, id) {
    let sql = `UPDATE Wallets SET name = '${data.name}',totalMoney = ${data.money} WHERE id = ${id}`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err
      });
  }
}
module.exports = new Wallets();
