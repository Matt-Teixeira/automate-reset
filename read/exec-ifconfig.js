const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const path = `./read/sh/ifconfig.sh`;

const execIfconfig = async (args) => {
  const { stdout: newData } = await execFile(path, args);
  return newData;
};

module.exports = execIfconfig;
