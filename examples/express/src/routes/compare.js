import express from 'express';
const router = express.Router();
import PrettyProperties, {
    parseProperties,
    diffProperties,
    unifiedDiffProperties
} from 'pretty-properties';

import * as JsDiff from 'diff';

router.post('/', async function (req, res, next) {
    try {
        const leftProperties = await parseProperties(req.body.left, true);
        const rightProperties = await parseProperties(req.body.right, true);
        const diffsArray = await unifiedDiffProperties(leftProperties, rightProperties);

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