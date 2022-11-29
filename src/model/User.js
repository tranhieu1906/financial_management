const db = require("./DBconnect");

class User {
  async getListUsers() {
    let sql = "SELECT * FROM User";
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async InsertUser(data) {
    let sql = `insert into User(nameUser,passwordUser) values ('${data.name}','${data.password}')`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async changePassword(data) {
    let sql = data;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async CheckOldPassword(data) {
    let sql = data;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async UpdateUser(data, id) {
    console.log(data);
    let sql = `update User set nameUser = '${data.nameInfo}' ,address = '${data.addressInfo}',phone = '${data.phoneInfo}',email = '${data.emailInfo}',cccd = '${data.cccdInfo}',gender = '${data.gender}' where ${id} = userId`;
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
module.exports = new User();
