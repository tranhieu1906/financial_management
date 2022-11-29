const fs = require("fs");
const qs = require("qs");
const cookie = require("cookie");
class CookieAndSession {
  async writeCookieAndSession(req, res, data) {
    try {
      let sessionName = Date.now();
      let dataSession = [...data, sessionName];
      fs.writeFile(
        "src/session/" + sessionName + ".txt",
        JSON.stringify(dataSession),
        (err) => {
          if (err) {
            console.log(err.message);
          }
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("key", JSON.stringify(sessionName), {
              httpOnly: true,
              maxAge: 60 * 60 * 24 * 7, // 1 week
            })
          );
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  checkingSession(req) {
    try {
      let cookies = req.headers.cookie
        ? cookie.parse(req.headers.cookie).key
        : "";
      let tokenData = fs.existsSync("src/session/" + cookies + ".txt")
        ? JSON.parse(fs.readFileSync("src/session/" + cookies + ".txt", "utf-8"))
        : false;
      return tokenData;
    } catch (error) {
      console.log(error.message);
    }
  }
  async deleteSession(req) {
    try {
      let cookies = req.headers.cookie
        ? cookie.parse(req.headers.cookie).key
        : "";
      fs.unlinkSync("src/session/" + cookies + ".txt");
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new CookieAndSession();
