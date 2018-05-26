var googleTrends = require('google-trends-api');
var trendConst = require('./const')
const START_DATE = new Date('04/28/2013');

function CryptoTrend() {

  function getHistoricalTrends(coin, type, startDate) {
    var GOOGLETREND_APIS = trendConst.GOOGLETREND_APIS;
    var fn;

    switch (type) {
      case GOOGLETREND_APIS.interestOverTime:
        fn = googleTrends.interestOverTime;
        break;
      case GOOGLETREND_APIS.interestByRegion:
        fn = googleTrends.interestByRegion;
        break;
      case GOOGLETREND_APIS.relatedQueries:
        fn = googleTrends.relatedQueries;
        break;
        case GOOGLETREND_APIS.relatedTopics:
          fn = googleTrends.relatedTopics;
          break;
    }
    try {
      var option = {
        keyword: coin.replace('-', ' '),
        startTime: startDate || START_DATE,
        endTime: new Date()
      }

      return new Promise(function(resolve, reject) {
        fn.apply(this, [option])
          .then(function(results) {
            return resolve(results);
          })
          .catch(function(err) {
            console.log(err);
            return reject(err)
          });
      })
    } catch (ex) {
      console.log(ex)
    }
  }

  return {
    getHistoricalTrends: getHistoricalTrends
  }
}
module.exports = CryptoTrend;
