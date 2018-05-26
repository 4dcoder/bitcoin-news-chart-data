'use strict';

var Promise = require('bluebird');
var osmosis = require('osmosis');
var _ = require('lodash');
const link = 'https://cryptoinsider.com/';

function CrytoInsiderCrawler() {}

CrytoInsiderCrawler.prototype.getNews = function() {
  console.log('get news from ' + link);

  function newsFunc(resolve, reject) {
    var listings = [];

    osmosis
      .get(link)
      .find('article')
      .set({
        'img': '.header > a > img@src',
        'title': '.post-content > .post-title',
        'link': '.post-content > .post-title > a@href',
        'meta': '.post-content > .post-meta > updated ',
        'summary': '.post-content > .excerpt.entry-summary',

      })
      .data(function(listing) {
        listings.push(listing);
      })
      .done(function() {
        resolve(listings);
      });
  }

  return new Promise(function(resolve, reject) {
    return newsFunc(resolve, reject);
  });
};

module.exports = CrytoInsiderCrawler;
