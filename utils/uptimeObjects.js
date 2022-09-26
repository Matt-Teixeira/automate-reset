
const uptimeObjects = (SMEs, [reSME, re4, re5, re6]) => {
    let uptimes = [];

    for (let sme of SMEs) {
      let smeNum = sme.match(reSME);
      let logfiles = sme.match(re4);
      let timeZone = sme.match(re6);

      let data = {
        time_zone: timeZone[0].split(" ")[1],
        sme: smeNum[0],
        log_files: logfiles,
        run_time: [],
      };
      for (let log of logfiles) {
        const lastRunTime = log.match(re5);
        data.run_time.push(lastRunTime[0]);
      }
      uptimes.push(data);
    }
    return uptimes;
}

module.exports = uptimeObjects;