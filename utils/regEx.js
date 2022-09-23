const all_sme_regEx = /SME\d{5}/;
const sme_blocks_regEx = /ok:\s\[SME\d{5}\]\s=>.*?\}/g;
const logFiles_regEx = /"-rw-.*?\.log/g;
const logFile_time_regEx = /\d{2}:\d{2}/g;
const networkBlock = /en\w+?:.*?collisions/g;
const matchInet = /inet\s\d/
const networkAdapter = /en\w+/;

module.exports = {
  all_sme_regEx,
  sme_blocks_regEx,
  logFiles_regEx,
  logFile_time_regEx,
  networkBlock,
  networkAdapter,
  matchInet
};
