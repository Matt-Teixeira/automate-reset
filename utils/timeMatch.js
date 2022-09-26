const timeMatch = () => {
  let date = new Date();
  let hour = date.getHours() - 4;
  let minute = date.getMinutes();
  let timeMatch;

  if (minute >= 15 && minute < 45) {
    timeMatch = `${hour}:15`;
  } else if (minute > 15 && minute >= 45) {
    timeMatch = `${hour}:45`;
  } else {
    timeMatch = `${hour - 1}:45`;
  }

  if (timeMatch[0] >= 1 && timeMatch[1] === ":") {
    timeMatch = "0" + timeMatch;
  }

  return timeMatch;
};

let time = timeMatch();
console.log(time);

const timeZoneOffset = {
  CDT: 1,
  MDT: 2,
  PDT: 3,
};

const offsetTime = (timeZone) => {
  let newTime = "";
  let time = timeMatch();

  if (timeZone === "EDT") {
    return time;
  }

  offset = time.split(":")[0];
  offset = parseInt(time) - timeZoneOffset[timeZone];

  newTime = offset.toString() + ":" + time.split(":")[1];

  if (newTime[0] >= 1 && newTime[1] === ":") {
    newTime = "0" + newTime;
  }

  return newTime;
};

module.exports = { timeMatch, timeZoneOffset, offsetTime };
