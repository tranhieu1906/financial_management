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
    data = data.replace("{1}", surplus[0].totalMoney + " VND");
    if (cost.length == 0) {
      data = data.replace("{2}", 0);
    } else {
      data = data.replace("{2}", -cost[0].sum + " VND");
    }
    if (income.length == 0) {
      data = data.replace("{3}", 0);
    } else {
      data = data.replace("{3}", "+" + income[0].sum + " VND");
    }
    let TransactionDetails = await Wallets.TransactionDetails(query);
    let html = "";
    TransactionDetails.forEach((element) => {
      html += ` <div class="row py-2 mb-2" style="background-color:#f4f7fa">
                <div class="col">
                    <strong>${element.name}</strong>
                </div>
                <div class="col">
                    ${element.note}
                </div>
                <div class="col">
                    ${element.date}
                </div>
                <div class="col text-end">
                    ${element.money}
                </div>
                <div class="col text-end">
                    <a href="/detail/edit?id=${element.id}&id_wallets=${surplus[0].id}">
                        <button class="btn btn-success ">Chỉnh sửa</button>
                    </a>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Xóa
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa 1 giao dịch</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
        Bạn có thực sự muốn xóa các giao dịch này?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        <a href="/detail/delete?id=${element.id}&id_wallets=${surplus[0].id}">
                        <button class="btn btn-danger ">Xóa</button>
                    </a>
      </div>
    </div>
  </div>
</div>
                    
                </div>
            </div>`;
    });
    data = data.replace("{listTransaction}", html);
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
  async ShowEditTransaction(req, res, query) {
    let isLogin = CookieAndSession.checkingSession(req);
    let data = await getTeamplates.readTemplate("./view/editTransaction.html");
    data = data.replace("{user}", isLogin[1]);
    let TransactionDetails = await Wallets.formTransaction(query);
    data = data.replace("{transaction}", TransactionDetails[0].name);
    data = data.replace("{note}", TransactionDetails[0].note);
    data = data.replace("{time}", TransactionDetails[0].date);
    data = data.replace("{money}", TransactionDetails[0].money);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  }
  async EditTransaction(req, res, query, id_Wallets) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async() => {
      let newData = qs.parse(data);
      Wallets.editTransaction(newData);
      let result = await Wallets.selectTransaction(query);
      console.log(result);
      if (newData.select1 == 1) {
        Wallets.updateMoney(-result[0].money, id_Wallets);
      } else {
        Wallets.updateMoney(result[0].money, id_Wallets);
      }
      res.writeHead(301, { Location: `/detail?id=${id_Wallets}` });
      res.end();
    });
    req.on("error", (err) => {
      console.log(err);
    });
  }
  async DeleteTransaction(req, res, query, id_Wallets) {
    let result = await Wallets.selectTransaction(query);
    if (result[0].category_id == 1) {
      Wallets.updateMoney(-result[0].money, id_Wallets);
    } else {
      Wallets.updateMoney(result[0].money, id_Wallets);
    }
    await Wallets.DeleteLogTransactions(query);
    res.writeHead(301, { Location: `/detail?id=${id_Wallets}` });
    res.end();
  }
}

module.exports = new WalletsController();
