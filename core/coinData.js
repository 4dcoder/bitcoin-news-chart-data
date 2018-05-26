"use strict";
const TrendConst = require('./google-trend/const')
const MarketCap = require('./data/marketCap')
const DataFb = require('./dataFb')
const coins = TrendConst.COINS;
var dataFb = new DataFb();
var marketCap = new MarketCap();
var _ = require('lodash');
const START_DATE = '20130428';
function CoinData() {}

function onError(e) {
  console.log(e);
}

function retrieveAllTimeData(coin, resolve, timeframe) {
  var mc = new MarketCap();
  var endDateStr = mc.getDateString(new Date());
  mc.retrieveHistoricalData(coin, START_DATE, endDateStr).then(function (data) {
    dataFb.insertData(data, coin, 'HistoricalAllTime').then(function() {
      console.log('data insert done AllTime ', coin)
      return resolve('done')
    }).catch(onError)
  }).catch(onError);
}

function retrieveLastThreeMonthsData(coin, resolve) {
  new MarketCap().retrieveLastThreeMonths(coin).then(function(data) {
    dataFb.insertData(data, coin, 'PastThreeMonths').then(function() {
      console.log('data insert done PastThreeMonths ', coin)
      return resolve('done')
    }).catch(onError)
  }).catch(onError)
}

function retrieveLastYearData(coin, resolve) {
  new MarketCap().retrieveLastYear(coin).then(function(data) {
    dataFb.insertData(data, coin, 'PastYear').then(function() {
      console.log('data insert done PastYear', coin)
      return resolve('done')
    }).catch(onError)
  }).catch(onError)
}

CoinData.prototype.getThreeMonthsData = function() {
  var promises = _.map(coins, function(coin) {
    return new Promise(function(resolve, reject) {
      try{
        retrieveLastThreeMonthsData(coin, resolve)
      }
      catch (e) {
        console.log(e);
        resolve('goback anyway')
      }
    })
  });
  return Promise.all(promises);
}

CoinData.prototype.getLastYearData = function() {
  var promises = _.map(coins, function(coin) {
    return new Promise(function(resolve, reject) {
      try{
        retrieveLastYearData(coin, resolve)
      }
      catch (e) {
        console.log(e);
      }
    })
  });
  return Promise.all(promises);
}

CoinData.prototype.getAllTimeData = function() {
  console.log(coins)
  var promises = _.map(coins, function(coin) {
    return new Promise(function(resolve, reject) {
      try{
        retrieveAllTimeData(coin, resolve)
      }
      catch (e) {
        console.log(e);
      }
    })
  });
  return Promise.all(promises);
}

module.exports = CoinData;
