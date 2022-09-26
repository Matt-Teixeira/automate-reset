const all_sme_regEx = /SME\d{5}/;
const sme_blocks_regEx = /ok:\s\[SME\d{5}\]\s=>.*?\}/g;
const logFiles_regEx = /"-rw-.*?\.log/g;
const logFile_time_regEx = /\d{2}:\d{2}/g;
const networkBlock = /en\w+?\s+.*?collisions/g; // was /en\w+?:.*?collisions/g; not every ifconfig output adapter ends with ":"
const networkBlock2 = /en\w+?:.*?collisions/g;
const matchInet = /inet\s/; //was /inet\s\d/
const networkAdapter = /en\w+/;
const time_zone_regEx = /\s[A-Z]{3}/;

module.exports = {
  all_sme_regEx,
  sme_blocks_regEx,
  logFiles_regEx,
  logFile_time_regEx,
  networkBlock,
  networkBlock2,
  networkAdapter,
  matchInet,
  time_zone_regEx,
};
