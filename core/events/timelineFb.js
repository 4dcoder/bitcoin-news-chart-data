var fb = require('../firebaseManager');

function TimelineFb() {
  function onError(e) {
    console.log(e);
  }
  function insertData(data) {
    console.log('start insert')
    return new Promise(function(resolve, reject) {
      var ref = fb.FirebaseDatabase.ref('timeline');
      return ref.set(data).then(function() {
        return resolve('done ', data);
      }).catch(onError);
    }).catch(onError)
  }

  return {
    insertData: insertData
  }
}

module.exports = TimelineFb;
