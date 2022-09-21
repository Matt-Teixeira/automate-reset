const fs = require("fs");
const util = require("util");
const timeMatch = require("../utils/timeMatch");

const time = timeMatch();
console.log(time);

const readFile = util.promisify(fs.readFile);

function getDate() {
  return readFile("/home/matt-teixeira/Dev/ansible/myLog.txt", "utf8");
}

getDate()
  .then((data) => {
    data = JSON.stringify(data);
    //const re = /\d{2}:\d{2}:\d{2}/;
    //console.log(data.match(re)[0]);

    //const re2 = /TASK\s\[debug\].*PLAY\sRECAP/;
    //console.log(data.match(re2)[0]);

    // Match for SME number
    const reSME = /SME\d{5}/;

    // Get SME blocks
    const re3 = /ok:\s\[SME\d{5}\]\s=>.*?\}/g;
    const SMEs = data.match(re3);

    // Get Log Files for an SME block
    const re4 = /"-rw-.*?\.log/g;
    const logFiles = SMEs[0].match(re4);
    console.log(logFiles[0]);

    const re5 = /\d{2}:\d{2}/g;
    const lastRunTimes = logFiles[0].match(re5);
    console.log(lastRunTimes[0]);
    console.log(time === lastRunTimes[0]);

    for (let [i, sme] of SMEs.entries()) {
      let smeNum = sme.match(reSME);
      let logfiles = sme.match(re4);
      console.log(logfiles);
      for (let log of logfiles) {
        const lastRunTime = log.match(re5);
        console.log(lastRunTime[0] === time);
      }
    }
  })
  .catch((error) => {
    console.log(error);
  });
