// date object instance -> date string

function createDate(date) {
  return date.toISOString().slice(0, 10);
}

// ISODate string -> array of 10 dates

function createDateArr(ISOdate) {
  const arr = [];
  while (arr.length < 10) {
    const newYear = Number(ISOdate.substring(0, 4)) - arr.length;
    arr.push(newYear + ISOdate.substring(4, ISOdate.length));
  }
  return arr;
}

const makeDates = {
  myDate: new Date(),
  createDate,
  createDateArr,
};

// console.log(makeDates.createDateArr('1993-02-03'));


module.exports = makeDates;
