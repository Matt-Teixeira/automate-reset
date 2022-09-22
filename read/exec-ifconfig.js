const execFile = require("child_process").execFile;
const path = `./read/sh/ifconfig.sh`

const execIfconfig = async (args) => {
  execFile(path, args, (error, stdout, stderr) => {
    if (error) {
      console.log(`An error: ${error}`);
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    console.log(stdout);
    
    
  });
};

module.exports = execIfconfig;
