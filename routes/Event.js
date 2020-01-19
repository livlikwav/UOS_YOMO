var express = require('express');
var router = express.Router();
var addevent = require('./addevent');
var updated = require('./updated');
router.use('/addevent', addevent);
router.use('/updatedevent',updated);
module.exports = router;
