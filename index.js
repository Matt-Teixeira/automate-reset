require("dotenv").config();
const { log } = require("./logger");
const templtePath = `./read/sh/runUptimeAll.sh`;
const execTemplate = require("./read/exec-playbook");

const runJob = async (file, args) => {
  await log("info", "Run Job", "na", "Template Call", {
    file: file,
    args: args,
  });
  // Call bash script
  await execTemplate(file, args);
};

const onBoot = async () => {
  try {
    await log("info", "On Boot", "na", "On Boot Call", {
      LOGGER: process.env.LOGGER,
    });
    await runJob(templtePath);
  } catch (error) {
    console.log(error);
  }
};

onBoot();
