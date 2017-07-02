import { parseProperties, diffProperties } from '../../dist/index.js';

async function run() {
    const properties = await parseProperties(__dirname + '/properties/example.properties');
    const a = properties.getProperty('a');
    console.log(a);

    var leftProperties = await parseProperties(__dirname + '/properties/left.properties');
    var rightProperties = await parseProperties(__dirname + '/properties/right.properties');
    console.log(leftProperties);
    console.log(rightProperties);
    var diffs = await diffProperties(leftProperties.getProperties(), rightProperties.getProperties());
    console.log(diffs);
}

run();