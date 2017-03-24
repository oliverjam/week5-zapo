const getObits = require('../getObits.js');
const createDates = require('../createDates.js');

function serveAPI(request, response, date) {
  let datesArr;
  if (date) {
    if (date.match(/^(19|20)\d\d([- \/.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/g)) {
      datesArr = createDates.createDateArr(date);
    } else {
      throw new Error('Date needs to be in a valid format. yyyy-mm-dd');
    }
  } else {
    datesArr = createDates.createDateArr(createDates.createDate(createDates.myDate));
  }
  getObits(datesArr, (err, res) => {
    if (err) {
      // if error send 500 error to browser
      // return err;
      response.writeHead(500, { 'Content-Type': 'text/html', 'access-control-allow-origin': '*' });
      response.end("<h1>Sorry, we've got some problems on our side, don't worry, it'll all be over soon</h1>");
    }
    res.sort((a, b) => b.date.slice(0, 4) - a.date.slice(0, 4));
    // console.log(res);
    response.writeHead(200, { 'Content-Type': 'application/json', 'access-control-allow-origin': '*' });
    response.end(JSON.stringify(res));
  });
}

module.exports = serveAPI;
