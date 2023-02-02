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
  async TransactionDetails(id_Wallets) {
    let sql = `select C.name,DATE_FORMAT(date,'%e/%c/%Y') as date,money,note,transaction.id from transaction
              inner join Category C on transaction.id_Category = C.id
              where id_Wallets = ${id_Wallets}`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async formTransaction(id) {
    let sql = `select C.name,DATE_FORMAT(date,'%e/%c/%Y') as date,money,note,transaction.id from transaction
inner join Category C on transaction.id_Category = C.id
where transaction.id = ${id} ;`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async editTransaction(data) {
    let sql = `update transaction set id_Category = ${data.select1},note = '${data.note}',money = ${data.money}`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async selectTransaction(id) {
    let sql = `select W.id,W.name,C.id as category_id,C.name as category_name,money from transaction
                inner join Category C on transaction.id_Category = C.id
                inner join Wallets W on transaction.id_Wallets = W.id
                where transaction.id = ${id}`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async DeleteLogTransactions(id) {
    let sql = `delete from transaction where id = ${id}`;
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
