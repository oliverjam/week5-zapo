const getObits = require('../getObits.js');
const createDates = require('../createDates.js');

function serveAPI(request, response, date) {
  let datesArr;
  if (date) {
    datesArr = createDates.createDateArr(date);
  } else {
    datesArr = createDates.createDateArr(createDates.createDate(createDates.myDate));
  }
  getObits(datesArr, (err, res) => {
    if (err) {
      response.writeHead(500, { 'Content-Type': 'text/html', 'access-control-allow-origin': '*' });
      response.end("<h1>Sorry, we've got some problems on our side, don't worry, it'll all be over soon</h1>");
    }
    if (res.every(e => e.date)) {
      res.sort((a, b) => b.date.slice(0, 4) - a.date.slice(0, 4));
    }
    response.writeHead(200, { 'Content-Type': 'application/json', 'access-control-allow-origin': '*' });
    response.end(JSON.stringify(res));
  });
}

module.exports = serveAPI;
