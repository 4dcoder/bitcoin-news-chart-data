var CoinNews = require('./core/coinNews');
var CoinData = require('./core/coinData');
var CoinTrend = require('./core/coinTrend');
var TrendConst = require('./core/google-trend/const');
var GoogleTrendAPIs = TrendConst.GOOGLETREND_APIS;
var promises = [];

promises.push(new CoinNews().collectNews());

promises.push(new CoinData().getThreeMonthsData());
promises.push(new CoinData().getAllTimeData());

promises.push(new CoinTrend().getHistoricalTrends(GoogleTrendAPIs.interestOverTime));
promises.push(new CoinTrend().getHistoricalTrends(GoogleTrendAPIs.interestByRegion));
promises.push(new CoinTrend().getHistoricalTrends(GoogleTrendAPIs.relatedQueries));
promises.push(new CoinTrend().getHistoricalTrends(GoogleTrendAPIs.relatedTopics));

Promise.all(promises).then(exit);

function exit() {
  console.log('great. all done. exit')
  process.exit()
}
