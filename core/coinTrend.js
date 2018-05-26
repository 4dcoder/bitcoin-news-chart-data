"use strict";
const TrendConst = require('./google-trend/const')
const coins = TrendConst.COINS
const ALL_TIME = 'HistoricalAllTime';

var trend = require('./google-trend/trend');
var trendFb = require('./trendFb');
var Trend = new trend();
var TrendFb = new trendFb();
var _ = require('lodash');
var trendConst = require('./google-trend/const')

function CoinTrend() {}

CoinTrend.prototype.getHistoricalTrends = function(trendName) {
  var dbInfo = {
    trendname: trendName,
    timespan: ALL_TIME,
  };
  var promises = _.map(coins, function(coin) {
    return new Promise(function(resolve, reject) {
      try {
        Trend.getHistoricalTrends(coin, trendName).then(function(data) {
          dbInfo.coin = coin;
          TrendFb.insertTrendData(data, dbInfo).then(function () {
            console.log('data insert complete', dbInfo);
            resolve(dbInfo)
          })
        });
      } catch (ex) {
        console.log(ex)
      }
    });
  });

  return Promise.all(promises)
}

module.exports = CoinTrend;
