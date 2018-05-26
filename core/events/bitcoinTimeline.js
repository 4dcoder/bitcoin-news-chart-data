var Promise = require('bluebird');
var osmosis = require('osmosis');

function BitcoinTimeLine() {
  function TimeLineParser(resolve, reject) {
    var link = 'https://99bitcoins.com/price-chart-history/';
    var listings = [];
    console.log('get news from ' + link);
    osmosis
      .get(link)
      .find('.bitcoin_history')
      .set({
        'summary': 'p',
        'sources': 'p > a@href',
        'title': 'h3'
      })
      .data(function(listing) {
        var arr = listing.title.split('-');
        if (arr.length >= 2) {
          listing.title = arr[0].trim();
          listing.date = arr[1].trim();
        }
        listings.push(listing);
      })
      .error(console.log)
      .done(function() {
        resolve(listings);
      });
  }

  function getTimeLine() {
    return new Promise(function(resolve, reject) {
      return TimeLineParser(resolve, reject);
    })
  }

  function exchangeInfo(resolve, reject) {
    var link = 'https://en.wikipedia.org/wiki/List_of_bitcoin_companies';
    var listings = [];
    console.log('get news from ' + link);
    osmosis
      .get(link)
      .find('table')
      .set('data')
      .data(function(listing) {
        console.log(listing);
        listings.push(listing);
      })
      .error(console.log)
      .done(function() {
        resolve(listings);
      });
  }

  function getExchanges() {
    return new Promise(function(resolve, reject) {
      return exchangeInfo(resolve, reject);
    })
  }

  return {
    getTimeLine: getTimeLine,
    getExchanges: getExchanges
  }
}

module.exports = BitcoinTimeLine;
