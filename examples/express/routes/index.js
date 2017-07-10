var express = require('express');
var router = express.Router();
// <<<<<<< HEAD


// =======
// var PrettyProperties = require('pretty-properties');
// const {
//     parseProperties,
//     diffProperties
// } = require('pretty-properties');

// let dif2html = require("diff2html").Diff2Html;
// >>>>>>> working on properties
/* GET home page. */
router.get('/', async function(req, res, next) {    
    res.render('index', {
        title: 'Diffs'
    });
});

module.exports = router;