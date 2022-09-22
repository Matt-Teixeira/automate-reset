const fs = require("fs");
const util = require("util");
const timeMatch = require("../utils/timeMatch");
const uptimeObjects = require("../utils/uptimeObjects");
const execIfconfig = require("../read/exec-ifconfig");
const {
  all_sme_regEx,
  sme_blocks_regEx,
  logFiles_regEx,
  logFile_time_regEx,
} = require("../utils/regEx")

const time = timeMatch();
console.log(time);

const readFile = util.promisify(fs.readFile);

function getDate() {
  return readFile("/home/matt-teixeira/Dev/ansible/myLog.txt", "utf8");
}

getDate()
  .then((data) => {
    data = JSON.stringify(data);

    // Get SME blocks
    const SMEs = data.match(sme_blocks_regEx);

    const smeObjects = uptimeObjects(SMEs, time, [all_sme_regEx, logFiles_regEx, logFile_time_regEx]);

    return smeObjects;
  })
  .then((data) => {
    console.log(data);
    for (let sme of data) {
      for (let time of sme.runOnTime) {
        if (time === false) {
          console.log("This sme has to be reset: " + sme.sme);
          execIfconfig([sme.sme]);
        }
      }
    }
  })
  .catch((error) => {
    console.log(error);
  });
