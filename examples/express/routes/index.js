var express = require('express');
var router = express.Router();
var PrettyProperties = require('pretty-properties');
const {
    parseProperties
} = require('pretty-properties');
/* GET home page. */
router.get('/', async function(req, res, next) {
    var leftProperties = await parseProperties(__dirname + '/../properties/left.properties');
    var rightProperties = await parseProperties(__dirname + '/../properties/right.properties');
    
    res.render('index', {
        title: 'Express',
        leftProperties: JSON.stringify(leftProperties.getProperties()),
        rightProperties: JSON.stringify(rightProperties.getProperties())
    });
});

module.exports = router;