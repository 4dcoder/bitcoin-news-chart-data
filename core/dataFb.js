var fb = require('./firebaseManager');
var _ = require('lodash');

function DataFb() {

  function insertData(data, refname, parent) {
    console.log('start insert')
    return new Promise(function(resolve, reject) {
      let ref = 'data';
      if (parent) {
        ref = `/data/${parent}`
      }
      return insert(data, ref, refname, resolve, reject)
    })
  }

  function insert(data, ref, refname, resolve, reject) {
    refname = refname || 'bitcoin';
    var dbref = fb.FirebaseDatabase.ref(ref);
    var coinRef = dbref.child(refname);
    return coinRef.set(data).then(function() {
      return resolve('done ', data);
    });
  }


  return {
    insertData: insertData
  }
}

module.exports = DataFb;
