module.exports = function checkTodayDate(date) {
    const otherDate = new Date(date);
    const todayDate = new Date();
  
    if (
    (otherDate.getDate() == todayDate.getDate() &&
      otherDate.getMonth() == todayDate.getMonth() &&
      otherDate.getYear() == todayDate.getYear())
    ) {
      return true;
    } else {
      return false;
    }
  }