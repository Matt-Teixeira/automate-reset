require("dotenv").config();
const fs = require("fs");
const util = require("util");
const { offsetTime } = require("../utils/timeMatch");
const uptimeObjects = require("../utils/uptimeObjects");
const execIfconfig = require("../read/exec-ifconfig");
const execReset = require("../read/exec-reset");
const {
  all_sme_regEx,
  sme_blocks_regEx,
  logFiles_regEx,
  logFile_time_regEx,
  networkBlock,
  networkBlock2,
  networkAdapter,
  matchInet,
  time_zone_regEx,
} = require("../utils/regEx");

const readFile = util.promisify(fs.readFile);

async function getDate() {
  let data = await readFile(
    "/home/matt-teixeira/Dev/ansible/myLog.txt",
    "utf8"
  );
  return JSON.stringify(data);
}

const parseFileData = async () => {
  const data = await getDate();

  const SMEs = data.match(sme_blocks_regEx);

  const smeObjects = uptimeObjects(SMEs, [
    all_sme_regEx,
    logFiles_regEx,
    logFile_time_regEx,
    time_zone_regEx,
  ]);
  console.log(smeObjects);
  for (let sme of smeObjects) {
    //console.log("This is SME time-zone: " + sme.time_zone);
    for (let time of sme.run_time) {
      //console.log(offsetTime(sme.time_zone) === time);

      if (!(offsetTime(sme.time_zone) === time)) {
        console.log("This sme may need a reset: " + sme.sme);
        let info = await execIfconfig([sme.sme]);
        //console.log(info);
        info = JSON.stringify(info);
        let adapterBlocks = info.match(networkBlock);
        if (adapterBlocks === null) {
          adapterBlocks = info.match(networkBlock2);
        }
        for (let adapter of adapterBlocks) {
          const adp = adapter.match(networkAdapter)[0];
          const isConnected = matchInet.test(adapter);
          console.log("Adapter time is off but is connected: " + isConnected);
          console.log(adp);
          console.log("*****************************");
          /* if (!isConnected) {
            const adp = adapter.match(networkAdapter)[0];
            console.log(adp);
            await execReset([sme.sme, process.env.RM_PW, adp]);
          } */
        }
        break;
      }
    }
  }
};

// --limit SME13582 old rdu  --limit SME01891
parseFileData();
