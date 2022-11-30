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
  async showWallets2(id) {
    let sql = `SELECT * FROM Wallets where id = ${id}`;
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
    let sql = `INSERT INTO Wallets(userId,name,totalMoney,surplus) VALUES(${id},'${wallet.nameWallet}',${wallet.money},${wallet.money})`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
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
        throw err;
      });
  }
  async deleteWallet(id) {
    let sql = `DELETE FROM Wallets WHERE id = ${id}`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async addTransaction(data, id) {
    let sql = `INSERT INTO transaction(date,money,id_Wallets,id_Category,note) VALUES('${data.date}',${data.amount},${id},${data.select1},'${data.note}')`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async deleteTransaction(id) {
    let sql = `DELETE FROM transaction WHERE id_Wallets = ${id}`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async SumCost(query) {
    let sql = `select sum(money) as sum from transaction
where id_Category = 1 and id_Wallets = ${query}
group by id_Wallets;`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async SumIncome(query) {
    let sql = `select sum(money) as sum from transaction
where id_Category = 2 and id_Wallets = ${query}
group by id_Wallets;`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }

  async updateMoney(data, id) {
    let sql = `update Wallets set totalMoney = totalMoney-${data} WHERE id = ${id};`;
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
