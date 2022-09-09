const execFile = require("child_process").execFile;
const fs = require("fs");

const log = fs.createWriteStream("myLog.txt", { flags: "a" });

const execTemplate = (path, args) => {
  execFile(path, args, (error, stdout, stderr) => {
    if (error) {
      console.log(`An error: ${error}`);
    }
    if (stderr) {
      console.log(`stterr: ${stderr}`);
    }
    log.write(stdout);
  });
};

module.exports = execTemplate;
