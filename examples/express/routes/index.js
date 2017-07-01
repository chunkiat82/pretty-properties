var express = require('express');
var router = express.Router();
var PrettyProperties = require('pretty-properties');
const { parseProperties } = require('pretty-properties');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
