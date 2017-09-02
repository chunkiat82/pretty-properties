import express from 'express';
const router = express.Router();
import PrettyProperties, {
    parseProperties,
    diffProperties
} from 'pretty-properties';

import * as JsDiff from 'diff';

router.post('/', async function (req, res, next) {
    try {
        const leftProperties = await parseProperties(req.body.left, true);
        const left = leftProperties.getProperties();
        const rightProperties = await parseProperties(req.body.right, true);
        const right = rightProperties.getProperties();
        const diffsArray = [];
        const rightKeys = Object.keys(right);
        const leftKeys = Object.keys(left);
        const keys = [...new Set([...leftKeys, ...rightKeys])];
        keys.sort().forEach(key => {

            let {
                type: leftType,
                value: leftValue
            } = leftProperties.getPropertyAndType(key);
            let {
                type: rightType,
                value: rightValue
            } = rightProperties.getPropertyAndType(key);
            let type = 'json';

            console.log(`leftType=${leftType}`);
            console.log(`rightType=${rightType}`);
            console.log(`key=${key}`)
            if (leftType !== rightType || leftType === 'string') {
                type = 'text';
            } else {
                leftValue = JSON.stringify(leftValue, null, 2);
                rightValue = JSON.stringify(rightValue, null, 2);
            }

            if (leftValue === rightValue) return;
            // console.log(`key=${JSON.stringify(key)}`);
            // console.log(`leftValue=${JSON.stringify(leftValue)}`);
            // console.log(`rightValue=${JSON.stringify(rightValue)}`);       
            // console.log(`leftValueType=${typeof leftValue}`);
            // console.log(`rightValueType=${typeof rightValue}`);            
            // console.log(`type=${type}`)
            diffsArray[diffsArray.length] = JsDiff.createPatch(key,
                leftValue || '', rightValue || '',
                leftValue ? type : '/dev/null', rightValue ? type : '/dev/null');

            if (leftValue === undefined) {
                diffsArray[diffsArray.length] = 'new file mode 100644\n' + diffsArray[diffsArray.length];
            }

            // console.log(`rightValue=${rightValue}`);

            if (rightValue === undefined) {
                diffsArray[diffsArray.length] = 'deleted file mode 100644\n' + diffsArray[diffsArray.length];
            }
        });
        // console.log(diffsArray);
        // res.set({
        //     'content-type': 'text/plain; charset=utf-8'
        // });
        // res.send(diffsArray.join('\n'));
        const buf = Buffer.from(diffsArray.join('\n'), 'ascii');

        res.render('index', {
            title: 'Diffs',
            diffs: buf.toString('base64')
        });
    } catch (err) {
        res.send(`err=${err}`);
    }

});

export default router;