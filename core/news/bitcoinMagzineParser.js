'use strict';
var Promise = require('bluebird'),
  feedReader = require('./feedReader');

const feedUrl = 'https://bitcoinmagazine.com/feed/';

function BitcoinMagzineParser() {

}

BitcoinMagzineParser.prototype.parseFeed = function() {
  return new Promise(function(resolve, reject) {
    new feedReader(null, false, true).fetch(feedUrl, resolve, reject);
  });
}

module.exports = BitcoinMagzineParser;
