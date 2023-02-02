const fs = require("fs");
class getTeamplates {
  readTemplate(pathName) {
    return new Promise((resolve, reject) => {
      fs.readFile(pathName, "utf-8", (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }
}
module.exports = new getTeamplates();
