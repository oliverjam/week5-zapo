require('env2')('.env');
const createDates = require('./createDates');

const request = require('request');

const resultsArr = [];

function requests(datesArr, cb) {
  datesArr.forEach((date) => {
    const url = `https://content.guardianapis.com/search?tag=tone/obituaries&from-date=${date}&order-by=newest&api-key=${process.env.SECRET}&show-fields=trailText`;
    request(url, (err, res, body) => {
      const obj = {
        title: res.results[0].webTitle,
        url: res.results[0].webUrl,
        summary: res.results[0].fields.trailText,
      };
      resultsArr.push(obj);
      if (resultsArr.length === datesArr.length) {
        cb(resultsArr);
      }
    });
  });
}
