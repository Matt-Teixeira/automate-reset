require("dotenv").config();
const fs = require("fs");
const util = require("util");
const timeMatch = require("../utils/timeMatch");
const uptimeObjects = require("../utils/uptimeObjects");
const execIfconfig = require("../read/exec-ifconfig");
const execReset = require("../read/exec-reset");
const {
  all_sme_regEx,
  sme_blocks_regEx,
  logFiles_regEx,
  logFile_time_regEx,
  networkBlock,
  networkAdapter,
  matchInet,
} = require("../utils/regEx");

const time = timeMatch();
console.log(time);

const readFile = util.promisify(fs.readFile);

async function getDate() {
  let data = await readFile(
    "/home/matt-teixeira/Dev/ansible/myLog.txt",
    "utf8"
  );
  return JSON.stringify(data);
}

const parseFileData = async () => {
  console.log("In parse File Data");
  const data = await getDate();

  const SMEs = data.match(sme_blocks_regEx);

  const smeObjects = uptimeObjects(SMEs, time, [
    all_sme_regEx,
    logFiles_regEx,
    logFile_time_regEx,
  ]);
  console.log(smeObjects);
  for (let sme of smeObjects) {
    for (let time of sme.runOnTime) {
      if (time === false) {
        console.log("This sme has to be reset: " + sme.sme);
        let info = await execIfconfig([sme.sme]);
        info = JSON.stringify(info);
        const adapterBlocks = info.match(networkBlock);
        for (let adapter of adapterBlocks) {
          console.log(adapter);
          console.log("*****************************")
          const isConnected = matchInet.test(adapter);
          console.log(isConnected);
          if (!isConnected) {
            const adp = adapter.match(networkAdapter)[0];
            console.log(adp);
            await execReset([sme.sme, process.env.RM_PW, adp]);
          }
        }
        return;
      }
    }
  }
};

parseFileData();
