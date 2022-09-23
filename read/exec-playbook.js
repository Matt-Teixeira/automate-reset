const execFile = require("child_process").execFile;
const fs = require("fs");

const log = fs.createWriteStream("myLog.txt");

const execTemplate = async (path, args) => {
  execFile(path, args, (error, stdout, stderr) => {
    if (error) {
      console.log(`An error: ${error}`);
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    log.write(stdout);
    return stdout;
  });
};

module.exports = execTemplate;
