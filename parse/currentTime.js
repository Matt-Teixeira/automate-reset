const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

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

function getDate() {
  return readFile("/home/matt-teixeira/Dev/ansible/myLog.txt", "utf8");
}

getDate()
  .then((data) => {
    data = JSON.stringify(data);
    const re = /\d{2}:\d{2}:\d{2}/;
    console.log(data.match(re)[0]);

    const re2 = /TASK\s\[debug\].*PLAY\sRECAP/;
    console.log(data.match(re2)[0]);
  })
  .catch((error) => {
    console.log(error);
  });
