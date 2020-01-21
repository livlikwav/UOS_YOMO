var express = require('express');
var router = express.Router();
var addevent = require('./addevent');
router.get('/',function(req,res){
  res.render('');
});
//router.use('/updatedevent',updated);
module.exports = router;
