const fs = require("fs");
const qs = require("qs");
const cookie = require("cookie");
const getTeamplates = require("../Handler/FileSystem");
const User = require("../model/User");
const CookieAndSession = require("./Session.controller.js");
class AuthController {
  LoginController(req, res) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      let newData = qs.parse(data);
      let userData = await User.getListUsers();
      for (let i = 0; i < userData.length; i++) {
        if (
          userData[i].phone == newData.name &&
          userData[i].passwordUser == newData.password
        ) {
          let dataSql = [
            userData[i].userId,
            userData[i].nameUser,
            userData[i].address,
            userData[i].phone,
            userData[i].password,
            userData[i].email,
            userData[i].cccd,
            userData[i].dateDK,
            userData[i].gender,
          ];
          CookieAndSession.writeCookieAndSession(req, res, dataSql);
          return;
        }
      }
      this.userWrong = true;
      res.statusCode = 302;
      res.setHeader("Location", "/login");
      res.end();
    });
    req.on("error", (err) => {
      console.log(err);
    });
  }
  async logOutUser(req, res) {
    try {
      await CookieAndSession.deleteSession(req);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    } catch (e) {
      console.log(e.message);
    }
  }
  RegisterController(req, res) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let newData = qs.parse(data);
      User.InsertUser(newData);
      res.writeHead(301, { Location: "/" });
      res.end();
    });
    req.on("error", (err) => {
      console.log(err);
    });
  }
  async ChangePassword(req, res) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      let inputForm = qs.parse(data);
      const idUser = await CookieAndSession.checkingSession(req)[0];
      const oldPass = await User.CheckOldPassword(
        `select count(userId) as count from User where userId=${idUser} and passwordUser=${inputForm.oldpassword}`
      );
      if (oldPass[0].count) {
        let strQuery = "update User set ";
        if (inputForm.password) {
          strQuery += `passwordUser="${inputForm.password}" where userId=${idUser}`;
        }
        User.changePassword(strQuery);
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      } else {
        res.statusCode = 302;
        res.setHeader("Location", "/changepass");
        res.end();
      }
    });
    req.on("error", (err) => {
      console.log(err);
    });
  }
  async ChangeInfo(req, res) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      let inputForm = qs.parse(data);
      const idUser = await CookieAndSession.checkingSession(req)[0];
      User.UpdateUser(inputForm, idUser);
      res.writeHead(301, { Location: "/" });
      res.end();
    });
    req.on("error", (err) => {
      console.log(err);
    });
  }
}
module.exports = new AuthController();
