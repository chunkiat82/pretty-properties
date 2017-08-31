var express = require('express');
var router = express.Router();
var PrettyProperties = require('pretty-properties');
const {
    parseProperties,
    diffProperties
} = require('pretty-properties');

var JsDiff = require('diff');

router.get('/', async function(req, res, next) {

    res.render('compare', {
        title: 'Diffs'
    });
});

module.exports = router;