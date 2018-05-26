var fbApp = require("firebase-admin");
var serviceAccount = require("./config/coin-news.json");
fbApp.initializeApp({
  credential: fbApp.credential.cert(serviceAccount),
  databaseURL: "https://coin-news.firebaseio.com/"
});

exports.FirebaseDatabase = fbApp.database();
