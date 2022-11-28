const fs = require("fs");
const qs = require("qs");
const getTeamplates = require("../Handler/FileSystem");
const CookieAndSession = require("./Session.controller");
const AuthController = require("./Auth.controller");
class SiteController {
  async showHomePage(req, res) {
    let isLogin = CookieAndSession.checkingSession(req, res);
    if (isLogin) {
      fs.readFile("./view/base.html", "utf-8", async (err, data) => {
        if (err) throw err;
        res.writeHead(200, { "content-type": "text/html" });
        data = data.replace("{user}", isLogin[1]);
        res.write(data);
        res.end();
      });
    } else {
      let data = await getTeamplates.readTemplate("./view/home.html");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  }
  async LoginPage(req, res) {
    let isLogin = CookieAndSession.checkingSession(req, res);
    if (isLogin) {
      res.writeHead(301, { Location: "/" });
      res.end();
    } else {
      let data = await getTeamplates.readTemplate("./view/login.html");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  }
  async RegisterPage(req, res) {
    let data = await getTeamplates.readTemplate("./view/register.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  }
  async ChangePassword(req, res) {
    let isLogin = CookieAndSession.checkingSession(req, res);
    if (isLogin) {
      let data = await getTeamplates.readTemplate("./view/changePassword.html");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    } else {
      res.writeHead(301, { location: "/login" });
      res.end();
    }
  }
  async ChangeInfo(req, res) {
    let isLogin = CookieAndSession.checkingSession(req, res);
    if (isLogin) {
      let data = await getTeamplates.readTemplate("./view/changeInfo.html");
      data = data.replace("{nameInfo}", isLogin[1]);
      data = data.replace("{phoneInfo}", isLogin[3]);
      if (isLogin[2]) {
        data = data.replace(
          `<input type="text" class="form-control" placeholder="address" name="addressInfo">`,
          `<input type="text" class="form-control" placeholder="address" name="addressInfo" value="${isLogin[2]}">`
        );
      }
      if (isLogin[5]) {
        data = data.replace(
          `<input type="text" class="form-control" placeholder="Email" name="emailInfo">`,
          `<input type="text" class="form-control" placeholder="Email" name="emailInfo" value="${isLogin[5]}">`
        );
      }
      if (isLogin[6]) {
        data = data.replace(
          `<input type="text" class="form-control" placeholder="Căn cước công đân" name="cccdInfo">`,
          `<input type="text" class="form-control" placeholder="Căn cước công đân" name="cccdInfo" value="${isLogin[6]}">`
        );
      }
      if (isLogin[8]) {
        if (isLogin[8] == "nu") {
          data = data.replace(
            `<option value="nu">Nữ</option>`,
            `<option value="nu" selected>Nữ</option>`
          );
        } else if (isLogin[8] == "nam") {
          data = data.replace(
            `<option value="nam">Nam</option>`,
            `<option value="nam" selected>Nam</option>`
          );
        } else {
          data = data.replace(
            `<option value="khac">Khác</option>`,
            `<option value="khac" selected>Khác</option>`
          );
        }
        data = data.replace();
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    } else {
      res.writeHead(301, { location: "/login" });
      res.end();
    }
  }
  async ShowPageNotFound(req, res) {
    let data = await getTeamplates.readTemplate("./view/notfound.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  }
}
module.exports = new SiteController();
