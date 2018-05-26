var fb = require('./firebaseManager');
var trendConst = require('./google-trend/const')

function TrendFb() {

  function insertTrendData(data, dbinfo) {
    console.log('start insert trend')
    return new Promise(function(resolve, reject) {
      try {
        insert(data, dbinfo).then(function() {
          resolve('done');
        })
      } catch (ex) {
        console.log(ex)
      }
    })
  }

  function insert(data, dbinfo) {
    let trendFbMap = trendConst.TREND_FB_MAP;
    let trendref = trendFbMap[dbinfo.trendname];
    let timespan = dbinfo.timespan;
    if (!trendref || !timespan || !dbinfo.coin) {
      console.log('no enough info provided for firebase db');
      reject('no enough info provided for firebase db')
    }
    let refname = `/${trendref}/${timespan}`;
    var ref = fb.FirebaseDatabase.ref(refname).child(dbinfo.coin);
    return ref.set(data);
  }

  return {
    insertTrendData: insertTrendData
  }
}

module.exports = TrendFb;
