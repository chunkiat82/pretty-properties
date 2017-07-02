var express = require('express');
var router = express.Router();
var PrettyProperties = require('pretty-properties');
const {
    parseProperties,
    diffProperties
} = require('pretty-properties');
/* GET home page. */
router.get('/', async function(req, res, next) {
    const leftProperties = await parseProperties(__dirname + '/../properties/left.properties');
    const rightProperties = await parseProperties(__dirname + '/../properties/right.properties');
    console.log(leftProperties.getProperties());
    console.log(rightProperties.getProperties());
    const diffs = diffProperties(leftProperties.getProperties(), rightProperties.getProperties());
    console.log(JSON.stringify(diffs,null,2));
    res.render('index', {
        title: 'Express',
        rows: diffs
    });
});

module.exports = router;