const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const path = `./read/sh/adapterReset.sh`;

const execReset = async (args) => {
  const { stdout: newData } = await execFile(path, args);
  console.log(newData);
  return newData;
};

module.exports = execReset;
