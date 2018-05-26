'use strict';

var Promise = require('bluebird');
var osmosis = require('osmosis');
var _ = require('lodash');

function CoinTelegraphCrawler() {}

CoinTelegraphCrawler.prototype.getNews = function() {
  function newsFunc(resolve, reject) {
    var link = 'https://cointelegraph.com/tags/cryptocurrencies';
    var listings = [];
    osmosis
      .get(link)
      .find('.row.result')
      .set({
        'img': 'figure > .image > @src',
        'title': 'figure > h2 > a',
        'link': 'figure > h2 > a@href',
        'summary': 'figure > .text',
      })
      .data(function(listing) {
        listings.push(listing);
      })
      .error(console.log)
      .done(function() {
        resolve(listings);
      });
  }

  return new Promise(function(resolve, reject) {
    return newsFunc(resolve, reject);
  })
};

module.exports = CoinTelegraphCrawler;
