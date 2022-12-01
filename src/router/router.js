const url = require("url");
const qs = require("qs");
const fs = require("fs");
const PATH = "/Users/hoa/MD3-case/Case_demo/view";
const SiteController = require("../controllers/Site.controller");
const AuthController = require("../controllers/Auth.controller");
const WalletsController = require("../controllers/Wallets.controller");
function router(req, res, next) {
  let parseUrl = url.parse(req.url);
  let path = parseUrl.path;
  let query = qs.parse(parseUrl.query);
  let mimeTypes = {
    webp: "image/webp",
    jpg: "images/jpg",
    png: "images/png",
    jpeg: "images/jpeg",
    js: "text/javascript",
    css: "text/css",
    svg: "image/svg+xml",
    ttf: "font/ttf",
    woff: "font/woff",
    woff2: "font/woff2",
    eot: "application/vnd.ms-fontobject",
  };
  const filesDefences = path.match(
    /\.js|\.css|\.png|\.svg|\.jpg|\.ttf|\.woff|\.woff2|\.eot|\.webp|\.jpeg/
  );
  if (filesDefences) {
    const extension = mimeTypes[filesDefences[0].toString().split(".")[1]];
    res.writeHead(200, { "Content-Type": extension });
    fs.createReadStream(PATH + req.url).pipe(res);
  } else {
    switch (path) {
      case "/":
        SiteController.showHomePage(req, res);
        break;
      case "/home":
        AuthController.LoginController(req, res);
        break;
      case "/login":
        SiteController.LoginPage(req, res);
        break;
      case "/logout":
        AuthController.logOutUser(req, res);
        break;
      case "/register":
        if (req.method === "GET") {
          SiteController.RegisterPage(req, res);
        } else {
          AuthController.RegisterController(req, res);
        }
        break;
      case "/changePass":
        if (req.method === "GET") {
          SiteController.ChangePassword(req, res);
        } else {
          AuthController.ChangePassword(req, res);
        }
        break;
      case "/change-info":
        if (req.method === "GET") {
          SiteController.ChangeInfo(req, res);
        } else {
          AuthController.ChangeInfo(req, res);
        }
        break;
      case "/create_wallet":
        WalletsController.createWallet(req, res);
        break;
      case `/detail?id=${query.id}`:
        if (req.method === "GET") {
          WalletsController.detail(req, res, query.id);
        } else {
          WalletsController.transaction(req, res, query.id);
        }
        break;
      case `/setting?id=${query.id}`:
        if (req.method === "GET") {
          WalletsController.Setting(req, res, query);
        } else {
          WalletsController.updateSetting(req, res, query);
        }
        break;
      case `/delete?id=${query.id}`:
        WalletsController.deleteSetting(req, res, query.id);
        break;
      case `/detail/edit?id=${query.id}&id_wallets=${query.id_wallets}`:
        if (req.method === "GET") {
          WalletsController.ShowEditTransaction(req, res, query.id);
        } else {
          WalletsController.EditTransaction(
            req,
            res,
            query.id,
            query.id_wallets
          );
        }
        break;
      case `/detail/delete?id=${query.id}&id_wallets=${query.id_wallets}`:
        WalletsController.DeleteTransaction(
          req,
          res,
          query.id,
          query.id_wallets
        );
        break;
      default:
        SiteController.ShowPageNotFound(req, res);
    }
  }
}
module.exports = router;
