import JsDiff from 'diff';
import express from 'express';
const router = express.Router();
import PrettyProperties from 'pretty-properties';
const {
    parseProperties,
    diffProperties
} = require('pretty-properties');

router.get('/', async function(req, res, next) {

    res.render('compare', {
        title: 'Diffs'
    });
});

export default router;