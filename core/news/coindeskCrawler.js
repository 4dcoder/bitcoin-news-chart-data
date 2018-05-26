'use strict';

var Promise = require('bluebird');
var osmosis = require('osmosis');
var _ = require('lodash');

function CoinDeskCrawler() {}

CoinDeskCrawler.prototype.getNews = function() {
  function newsFunc(resolve, reject) {
    var link = 'https://www.coindesk.com/';
    var listings = [];
    console.log('get news from ' + link);
    osmosis
      .get(link)
      .find('.article.medium')
      .set({
        'summary': '.post-info > p:last-child',
        'link': '.picture > a@href',
        'title': '.post-info > h3',
        'img': '.picture > a > img@src',
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

module.exports = CoinDeskCrawler;
