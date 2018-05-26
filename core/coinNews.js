var CoinDeskCrawler = require('./news/coindeskCrawler');
var CoinTelegraphCrawler = require('./news/coinTelegraphCrawler');
var CryptoInsiderCrawler = require('./news/cryptoInsiderCrawler');
var CryptoCoinNewsCrawler = require('./news/cryptoCoinNewsCrawler')
var NewsBitcoinParser = require('./news/newsBitcoinParser');
var RedditCryptoCoinParser = require('./news/redditCryptoParser');
var RedditBitcoinParser = require('./news/redditBitcoinParser');
var BitcoinMagzineParser = require('./news/bitcoinMagzineParser');
var newsFb = require('./newsFb');
var newsCollector = new newsFb();

const fbRefs = {
  coinDesk: 'coin-desk',
  coinTelegraph: 'coin-telegraph',
  bitcoinMagzine: 'bitcoin-magzine',
  cryptocoinsNews: 'crypto-coin-news',
  cyptoInsider: 'crypto-insider',
  newsBitCoin: 'news-bitcoin',
  redditCrypto: 'subreddit-cryptocurrency',
  redditBitcoin: 'subreddit-bitcoin'
}

function CoinNews() {}

CoinNews.prototype.addSrc = addSrc;
CoinNews.prototype.collectNews = collectNews;

function addSrc() {
  newsCollector.addNewsSrcList();
}

function collectNews() {
  var promises = [];
  var coinDesk = new CoinDeskCrawler().getNews().then(function(data) {
    return saveDataToFb(data, fbRefs.coinDesk);
  });
  promises.push(coinDesk);

  var coinTelegraph = new CoinTelegraphCrawler().getNews().then(function(data) {
    return saveDataToFb(data, fbRefs.coinTelegraph);
  });
  promises.push(coinTelegraph);

  var bitcoinMagzine = new BitcoinMagzineParser().parseFeed().then(function(data) {
    return saveDataToFb(data, fbRefs.bitcoinMagzine);
  });
  promises.push(bitcoinMagzine);

  var cryptocoinsnews = new CryptoCoinNewsCrawler().getNews().then(function(data) {
    return saveDataToFb(data, fbRefs.cryptocoinsNews);
  });
  promises.push(cryptocoinsnews);

  var cryptoInsider = new CryptoInsiderCrawler().getNews().then(function(data) {
    return saveDataToFb(data, fbRefs.cyptoInsider);
  });
  promises.push(cryptoInsider);

  var newsBitcoin = new NewsBitcoinParser().parseFeed().then(function(data) {
    return saveDataToFb(data, fbRefs.newsBitCoin);
  });
  promises.push(newsBitcoin);

  var redditCrypto = new RedditCryptoCoinParser().parseFeed().then(function(data) {
    return saveDataToFb(data, fbRefs.redditCrypto);
  });
  promises.push(redditCrypto);

  var redditBitcoin = new RedditBitcoinParser().parseFeed().then(function(data) {
    return saveDataToFb(data, fbRefs.redditBitcoin);
  });
  promises.push(redditBitcoin);

  return Promise.all(promises);
}

function saveDataToFb(data, refname) {
  return newsCollector.addNews(data, refname);
}

module.exports = CoinNews;
