import 'colors';
import jsdiff from 'diff';
import properties from 'properties';
import PrettyProperties from './index';

async function parseProperties(filename) {
    return new Promise((resolve, reject) => {
        properties.parse(filename, {
            path: true
        }, function(error, obj) {
            error ? reject(error) : resolve(new PrettyProperties(obj));
        });
    });
}

async function diffJSON(options = {},jsonLeft, jsonRight) {

    var diff = jsdiff.diffChars(jsonLeft, jsonRight);

    diff.forEach(function(part){
    // green for additions, red for deletions
    // grey for common parts
    var color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });

    console.log()
}

export { parseProperties , diffJSON };