var express = require('express');
var router = express.Router();
var PrettyProperties = require('pretty-properties');
const {
    parseProperties,
  diffProperties
} = require('pretty-properties');

var JsDiff = require('diff');


/* GET users listing. */
router.get('/', async function (req, res, next) {
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
  res.set({ 'content-type': 'text/plain; charset=utf-8' });
  res.send(diffs + diffs1 + diffs2 + diffs3);
});

module.exports = router;
