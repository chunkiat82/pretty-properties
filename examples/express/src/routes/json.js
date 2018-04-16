import express from 'express';
import fs from 'fs';        
const router = express.Router();
import PrettyProperties, {
    parseProperties,
    diffProperties,
    unifiedDiffProperties
} from 'pretty-properties';

import * as JsDiff from 'diff';

router.get('/', async function (req, res, next) {
    try {
        const leftProperties = new PrettyProperties(JSON.parse(fs.readFileSync(__dirname + '/../samples/1.json')));
        const rightProperties = new PrettyProperties(JSON.parse(fs.readFileSync(__dirname + '/../samples/2.json')));


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