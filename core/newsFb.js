var _ = require('lodash');
var fb = require('./firebaseManager');

function NewsFb() {

  NewsFb.prototype.addNews = addNews;

  NewsFb.prototype.addNewsSrcList = addNewsSrcList;

  function addNewsSrcList() {
    var srcList = ["bitcoin magzine", "coin desk", "coin telegraph", "crypto coin news", "crypto insider", "news bitcoin", "subreddit cryptocurrency"];
    _.each(srcList, function(src) {
      addNewsSrc(src.replace(/ /g, '-'), src)
    });
  }

  function addNewsSrc(refname, src) {
    var ref = fb.FirebaseDatabase.ref('/root');
    ref.child(refname).set({
      src: src,
      createdAt: new Date().toString()
    })
    console.log(src, 'added')
  }

  function addNews(newLists, refname) {
    console.log('add news now. total = ', newLists.length)
    return new Promise(function(resolve, reject) {
      return addNewsFunc(newLists, refname, resolve, reject);
    })
  }

  function onNewsValue(snapshot,newLists, refname) {
    var values = [];
    snapshot.forEach(function(obj) {
      values.push(obj.val())
    });
    var newsLists = _.differenceWith(newLists, values, function (a, b) {
        return a.link === b.link && a.title === b.title;
    });
    console.log(newsLists.length + 'found');
    promises = _.map(newsLists, function functionName(news) {
      return insertNews(news, refname)
    });
    console.log(promises.length, refname)
    return Promise.all(promises)
  }

  function onNewsRetrivalFailed(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }

  function insertNews(newsInfo, refname) {
    var news = fb.FirebaseDatabase.ref('/root/' + refname);
    newsInfo.timeStampInsert = new Date().toString();
    return new Promise(function(resolve, reject) {
      var newsRef = news.push();
      return newsRef.set(newsInfo).then(function() {
        return resolve('added ', news.title);
      });
    })
  }

  function addNewsFunc(newsLists, refname, resolve, reject) {
    var ref = fb.FirebaseDatabase.ref('/root').child(refname);
    return ref.once("value").then(function(snapshot) {
       onNewsValue(snapshot, newsLists, refname)
      .then(function() {
        console.log('add news done', refname)
        return resolve('refname');
      })
      .catch(function(error) {
        onNewsRetrivalFailed(error);
        return resolve('refname');
      })
    });
  }



}

module.exports = NewsFb;
