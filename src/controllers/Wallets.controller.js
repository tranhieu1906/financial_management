const fs = require("fs");
const qs = require("qs");
const getTeamplates = require("../Handler/FileSystem");
const CookieAndSession = require("./Session.controller.js");
const AuthController = require("./Auth.controller.js");
const Wallets = require("../model/wallets");
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
    let surplus = await Wallets.showWallets2(query);
    let cost = await Wallets.SumCost(query);
    let income = await Wallets.SumIncome(query);
    data = data.replace("{1}", surplus[0].totalMoney);
    if (cost.length == 0) {
      data = data.replace("{2}", 0);
    } else {
      data = data.replace("{2}", cost[0].sum);
    }
    if (income.length == 0) {
      data = data.replace("{3}", 0);
    } else {
      data = data.replace("{3}", income[0].sum);
    }
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
  async transaction(req, res, query) {
    let isLogin = CookieAndSession.checkingSession(req, res);
    let data = "";
    req.on("data", (chuck) => {
      data += chuck;
    });
    req.on("end", async () => {
      let newData = qs.parse(data);
      if (newData.select1 == 1) {
        Wallets.addTransaction(newData, query);
        Wallets.updateMoney(newData.amount, query);
      } else {
        Wallets.addTransaction(newData, query);
        Wallets.updateMoney(-newData.amount, query);
      }
      res.writeHead(301, { Location: `/detail?id=${query}` });
      res.end();
    });
    req.on("error", (err) => {
      console.log(err);
    });
  }

  async Setting(req, res, query) {
    let isLogin = CookieAndSession.checkingSession(req);
    let data = await getTeamplates.readTemplate("./view/setting.html");
    let dataWallets = await Wallets.showWallets(isLogin[0]); // chinh Money thanh Wallets
    data = data.replace("{user}", isLogin[1]);
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
    await Wallets.deleteTransaction(query);
    await Wallets.deleteWallet(query);
    res.writeHead(301, { Location: "/" });
    res.end();
  }
}

module.exports = new WalletsController();
