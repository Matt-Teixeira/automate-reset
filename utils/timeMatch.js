const timeMatch = () => {
  let date = new Date();
  let hour = date.getHours() - 4;
  let minute = date.getMinutes();
  let timeMatch;

  if (minute >= 15 && minute < 45) {
    return (timeMatch = `${hour}:15`);
  } else if (minute > 15 && minute >= 45) {
    return (timeMatch = `${hour}:45`);
  } else {
    return (timeMatch = `${hour - 1}:45`);
  }
};

module.exports = timeMatch