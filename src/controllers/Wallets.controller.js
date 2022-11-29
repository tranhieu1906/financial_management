const fs = require("fs");
const qs = require("qs");
const getTeamplates = require("../Handler/FileSystem");
const CookieAndSession = require("./Session.controller.js");
const AuthController = require("./Auth.controller.js");
const Wallets = require("../model/wallets");
const Money = require("../model/wallets.js");
const { log } = require("console");

class WalletsController {
  createWallet(req, res) {
    let isLogin = CookieAndSession.checkingSession(req, res);
    let data = "";
    req.on("data", (chuck) => {
      data += chuck;
    });
    req.on("end", async () => {
      let newData = qs.parse(data);
      Wallets.addWallet(newData, isLogin[0]);
      res.writeHead(301, { Location: "/" });
      res.end();
    });
    req.on("error", (err) => {
      console.log(err);
    });
  }
  async detail(req, res, query) {
    let isLogin = CookieAndSession.checkingSession(req, res);
    let data = await getTeamplates.readTemplate("./view/detail.html");
    data = data.replace("{user}", isLogin[1]);

    data = data.replace(
      "{setting}",
      `<a href="/setting?id=${query}">
                    <p class="text-muted">Wellet setting</p>
                </a>`
    );
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  }
  async Setting(req, res, query) {
    let isLogin = CookieAndSession.checkingSession(req);
    let data = await getTeamplates.readTemplate("./view/setting.html");
    let dataWallets = await Money.showWallets(isLogin[0]);
    data = data.replace("{user}", isLogin[1]);
    console.log(query.id);
    data = data.replace("{delete}", `/delete?id=${query.id}`);
    if ((dataWallets.id = query)) {
      data = data.replace("{nameWallet}", dataWallets[0].name);
      data = data.replace("{moneyWallet}", dataWallets[0].totalMoney);
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  }
  async updateSetting(req, res, query) {
    let isLogin = CookieAndSession.checkingSession(req);
    let data = "";
    req.on("data", (chuck) => {
      data += chuck;
    });
    req.on("end", async () => {
      let newData = qs.parse(data);
      Wallets.updateWallet(newData, query.id);
      res.writeHead(301, { Location: `/detail?id=${query.id}` });
      res.end();
    });
    req.on("error", (err) => {
      console.log(err);
    });
  }
  async deleteSetting(req, res, query) {
    let isLogin = CookieAndSession.checkingSession(req);
    Wallets.deleteWallet(query);
    res.writeHead(301, { Location: "/" });
    res.end();
  }
}

module.exports = new WalletsController();
