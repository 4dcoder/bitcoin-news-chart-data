var osmosis = require('osmosis');

function MarketCap() {

  function retriveHistoricalDataYesterdayOnly(ticker) {
    ticker = ticker || 'bitcoin';
    var url = `https://coinmarketcap.com/currencies/${ticker}/historical-data/`
    var latest = null;
    return new Promise(function(resolve, reject) {
      return osmosis
        .get(url)
        .find('#historical-data')
        .set({
          'data': 'tbody > tr:first-child'
        })
        .data(function(listing) {
          var dataArray = listing.data.split("\n");
          console.log(listing.data)
          if (dataArray.length !== 7) {
            throw ('oops, data error')
          }
          var data = {
            d: dataArray[0].trim(),
            o: dataArray[1].trim(),
            h: dataArray[2].trim(),
            l: dataArray[3].trim(),
            c: dataArray[4].trim(),
            v: dataArray[5].trim(),
            mc: dataArray[6].trim()
          }
          latest = data;
        })
        .log(console.log)
        .error(console.log)
        .done(function() {
          return resolve(latest)
        })
    })
  }

  function getDateString(date) {
    var month = (date.getMonth() + 1) + '';
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate() + '';
    day = day.length > 1 ? day : '0' + day;
    return date.getFullYear() + month + day;
  }

  function retrieveHistoricalData(ticker, startDate, endDate) {
    var url = `https://coinmarketcap.com/currencies/${ticker}/historical-data/?start=${startDate}&end=${endDate}`
    var latest = null;
    var datas = [];
    return new Promise(function(resolve, reject) {
      return osmosis
        .get(url)
        .find('#historical-data .table-responsive table tbody tr')
        .set('data')
        .data(function(listing) {
          var dataArray = listing.data.split("\n");
          if (dataArray.length !== 7) {
            throw ('oops, data error')
          }
          var data = {
            d: dataArray[0].trim(),
            o: dataArray[1].trim(),
            h: dataArray[2].trim(),
            l: dataArray[3].trim(),
            c: dataArray[4].trim(),
            v: dataArray[5].trim(),
            mc: dataArray[6].trim()
          }
          datas.push(data)
        })
        .log(console.log)
        .error(console.log)
        .done(function() {
          var dataString = JSON.stringify(datas);
          return resolve(dataString)
        })
    })
  }

  function retrieveLastThreeMonths(ticker) {
    ticker = ticker || 'bitcoin';
    var threeMonthPrior = new Date();
    var endDate = getDateString(new Date());
    threeMonthPrior.setMonth(threeMonthPrior.getMonth() - 3);
    var startDate = getDateString(threeMonthPrior);
    return retrieveHistoricalData(ticker, startDate, endDate);
  }

  function retrieveLastYear(ticker) {
    ticker = ticker || 'bitcoin';
    var oneYearPrior = new Date();
    var endDate = getDateString(new Date());
    oneYearPrior.setYear(oneYearPrior.getFullYear() - 1);
    var startDate = getDateString(oneYearPrior);
    return retrieveHistoricalData(ticker, startDate, endDate);
  }

  return {
    retriveHistoricalDataYesterdayOnly: retriveHistoricalDataYesterdayOnly,
    retrieveLastThreeMonths: retrieveLastThreeMonths,
    retrieveLastYear: retrieveLastYear,
    retrieveHistoricalData: retrieveHistoricalData,
    getDateString: getDateString
  }
}

module.exports = MarketCap;
