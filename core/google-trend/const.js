const GOOGLETREND_APIS = {
  interestOverTime: 'interestOverTime',
  interestByRegion: 'interestByRegion',
  relatedQueries: 'relatedQueries',
  relatedTopics: 'relatedTopics'
};

const TREND_FB_MAP = {
  interestByRegion: 'region-interest',
  interestOverTime: 'trend',
  relatedQueries: 'related-queries',
  relatedTopics: 'related-topics'
};

const COINS = ['bitcoin', 'ethereum', 'bitcoin-cash', 'ripple', 'litecoin', 'dash', 'neo', 'monero', 'ethereum-classic', 'nem'];

module.exports = {
    GOOGLETREND_APIS: GOOGLETREND_APIS,
    TREND_FB_MAP: TREND_FB_MAP,
    COINS: COINS
};
