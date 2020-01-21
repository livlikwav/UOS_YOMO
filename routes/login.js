var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");
var firebase = require("firebase");
var serviceAccount = require("../serviceAccountkey.json");

router.get('/', function(req, res, next) {
  var firebaseConfig = {
      apiKey: "AIzaSyDXzsBUt8pSmanFTMgG0otklsClBV8HaNE",
      authDomain: "uosyomo.firebaseapp.com",
      databaseURL: "https://uosyomo.firebaseio.com",
      projectId: "uosyomo",
      storageBucket: "uosyomo.appspot.com",
      messagingSenderId: "1034521288050",
      appId: "1:1034521288050:web:e1b96b5250007cff35d1eb",
      credential: admin.credential.cert(serviceAccount)
  };
  // Initialize Firebase
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://uosyomo.firebaseio.com"
  });
  res.render("login");
});

module.exports = router;
