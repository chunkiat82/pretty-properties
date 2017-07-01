import { parseProperties } from '../dist/index.js';

async function run() {
    const properties = await parseProperties(__dirname + '/example.properties');
    const a = properties.getProperty('a');
    console.log(a);
}

run();