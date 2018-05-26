'use strict';
var Promise = require('bluebird'),
  feedReader = require('./feedReader');

const feedUrl = 'https://news.bitcoin.com/feed';

function newsBitcoinParser() {}

newsBitcoinParser.prototype.parseFeed = function() {
  console.log('parse news from ' + feedUrl);

  return new Promise(function(resolve, reject) {
    new feedReader(null, false, true).fetch(feedUrl, resolve, reject)
  });
}

module.exports = newsBitcoinParser;
