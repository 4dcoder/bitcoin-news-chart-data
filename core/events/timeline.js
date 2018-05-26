"use strict";

var BitcoinTimeline = require('./bitcoinTimeline');
var TimelineFb = require('./timelineFb');

function TimeLine() {
  function saveTimeLineData() {
    return new BitcoinTimeline().getTimeLine().then(function(data) {
      return new TimelineFb().insertData(data);
    })
  }

  function saveExchangeData(){
    return new BitcoinTimeline().getExchanges();
  }
  return {
    saveExchangeData: saveExchangeData,
    saveTimeLineData: saveTimeLineData
  }
}

module.exports = TimeLine;
