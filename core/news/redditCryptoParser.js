'use strict';
var Promise = require('bluebird'),
  feedReader = require('./feedReader');

const feedUrl = 'https://www.reddit.com/r/cryptocurrency/.rss';

function RedditCryptoParser() {}

RedditCryptoParser.prototype.parseFeed = function() {
  return new Promise(function(resolve, reject) {
    new feedReader().fetch(feedUrl, resolve, reject)
  });
}

module.exports = RedditCryptoParser;
