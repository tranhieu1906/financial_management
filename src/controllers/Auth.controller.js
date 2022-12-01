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




      console.log(newData ,'newdata');
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
    req.on("end", async () => {
      let newData = qs.parse(data);


      console.log(newData ,'newdata')


      async  function   validatecheck(_data){
        const userCount = await User.CheckOldPassword(
            `select * from User where nameUser=${_data.name}`

        );

        //Mai hoi tutor phan nay , khi ma query xuong db ma khong tim dcuser thì su li ntn
        console.log(userCount ,'userCount');

        return true
      }
  let check = await validatecheck(newData)
      // check
      if (check){
        User.InsertUser(newData);
        res.writeHead(301, { Location: "/" });
        res.end();
      }else {
        res.writeHead(500, { Location: "/" });
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
