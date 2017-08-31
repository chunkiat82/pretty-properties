import express from 'express';
const router = express.Router();
import PrettyProperties, {
    parseProperties,
    diffProperties
} from 'pretty-properties';

const JsDiff = require('diff');


/* GET users listing. */
router.get('/', async function(req, res, next) {
    const leftProperties = await parseProperties(__dirname + '/../properties/left.properties');
    const rightProperties = await parseProperties(__dirname + '/../properties/right.properties');
    // console.log(leftProperties.getProperties());
    // console.log(rightProperties.getProperties());


    const diffs = JsDiff.createPatch('property1',
        leftProperties.getProperties().property1,
        rightProperties.getProperties().property1,
        'text',
        'text');

    const diffs1 = JsDiff.createPatch('property2',
        JSON.stringify(JSON.parse(leftProperties.getProperties().property2), null, 2),
        JSON.stringify(JSON.parse(rightProperties.getProperties().property2), null, 2),
        'json',
        'json');

    const diffs2 = JsDiff.createPatch('property3',
        leftProperties.getProperties().property3,
        '',
        'text',
        'text');

    const diffs3 = JsDiff.createPatch('property4',
        JSON.stringify(JSON.parse(leftProperties.getProperties().property4), null, 2),
        JSON.stringify(JSON.parse(rightProperties.getProperties().property4), null, 2),
        'json',
        'json');
    res.set({
        'content-type': 'text/plain; charset=utf-8'
    });
    res.send(diffs + diffs1 + diffs2 + diffs3);
});

router.post('/', async function(req, res, next) {
    try {
        const leftProperties = await parseProperties(req.body.left, true);
        const left = leftProperties.getProperties();
        const rightProperties = await parseProperties(req.body.right, true);
        const right = rightProperties.getProperties();
        const diffsArray = [];
        // if count
        Object.keys(left).forEach(key => {

            let {
                type: leftType,
                value: leftValue
            } = leftProperties.getPropertyAndType(key);
            let {
                type: rightType,
                value: rightValue
            } = rightProperties.getPropertyAndType(key);
            let type = 'json';
            if (leftType !== rightType || leftType === 'string') {
                type = 'text';
            } else {
                leftValue = JSON.stringify(leftValue, null, 2);
                rightValue = JSON.stringify(rightValue, null, 2);
            }
            // console.log(`key=${JSON.stringify(key)}`);
            // console.log(`leftValue=${JSON.stringify(leftValue)}`);
            // console.log(`rightValue=${JSON.stringify(rightValue)}`);       
            // console.log(`leftValueType=${typeof leftValue}`);
            // console.log(`rightValueType=${typeof rightValue}`);            
            // console.log(`type=${type}`)
            diffsArray[diffsArray.length] = JsDiff.createPatch(key, leftValue || '', rightValue || '', type, type);
        });
        // res.set({
        //     'content-type': 'text/plain; charset=utf-8'
        // });
        // res.send(diffsArray.join('\n'));
        const buf = Buffer.from(diffsArray.join('\n'), 'ascii');

        res.render('index', {
            title: 'Diffs 1',
            diffs: buf.toString('base64')
        });
    } catch (err) {
        res.send(`err=${err}`);
    }

});

module.exports = router;