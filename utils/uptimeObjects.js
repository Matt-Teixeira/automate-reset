
const uptimeObjects = (SMEs, time, [reSME, re4, re5]) => {
    let uptimes = [];

    for (let sme of SMEs) {
      let smeNum = sme.match(reSME);
      let logfiles = sme.match(re4);

      let data = {
        sme: smeNum[0],
        log_files: logfiles,
        runOnTime: [],
      };
      for (let log of logfiles) {
        const lastRunTime = log.match(re5);
        data.runOnTime.push(lastRunTime[0] === time);
      }
      uptimes.push(data);
    }
    return uptimes;
}

module.exports = uptimeObjects;