const mysql = require("mysql2");

class DBconnect {
  constructor() {
    this.connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "12345678",
      database: "MD3",
      charset: "utf8_general_ci"
    });
  }
  async runMySQL(sql) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = new DBconnect();
