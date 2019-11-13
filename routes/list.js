var express = require('express');
var router = express.Router();
/////////////////
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
/////////////jquery 연동////////////////


router.get('/', function(req, res,  next) {
  var date=req.param('date');
  res.render('list',{date :date});
});
module.exports = router;
