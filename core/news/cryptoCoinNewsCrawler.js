'use strict';

var Promise = require('bluebird');
var osmosis = require('osmosis');
var _ = require('lodash');
const link = 'https://www.cryptocoinsnews.com/';

function CryptoCoinNewsCrawler() {}

CryptoCoinNewsCrawler.prototype.getNews = function() {
  function newsFunc(resolve, reject) {
    var listings = [];
    osmosis
      .get(link)
      .find('.category-news')
      .set({
        'img': 'a.grid-thumb-image > img@src',
        'title': 'a@title',
        'link': 'a@href',
        'meta': '.grid-text > .grid-date > .date ',
      })
      .data(function(listing) {
        listings.push(listing);
      })
      .log(console.log)
      .error(console.log)
      .debug(console.log)
      .done(function() {
        resolve(listings);
      });
  }
  return new Promise(function(resolve, reject) {
    return newsFunc(resolve, reject);
  });
};

module.exports = CryptoCoinNewsCrawler;
