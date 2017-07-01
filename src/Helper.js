require('colors');
const jsdiff = require('diff')
var debug = require('debug')('prettyproperties');

import properties from 'properties';
import PrettyProperties from './index';
import {
    TYPE,
    DIFF_TYPE,
    MAPPING_TYPE
} from './Constants';

async function parseProperties(filename) {
    return new Promise((resolve, reject) => {
        properties.parse(filename, {
            path: true
        }, function(error, obj) {
            error ? reject(error) : resolve(new PrettyProperties(obj));
        });
    });
}

function diff(left, right, options = {
    type: TYPE.STRING,
    diffType: DIFF_TYPE.LINES,
    fullDiff: true
}) {

    const diffFunction = jsdiff[MAPPING_TYPE[options.type + options.diffType]]
    const diffs = diffFunction(left, right);

    if (debug.enabled) {
        debug(`diffs=${JSON.stringify(diffs, null, 2)}`)
    }

    if (!options.fullDiff) {
        var filteredDiffs = [];
        diffs.forEach((part) => {
            if (part.removed || part.added) {
                filteredDiffs[filteredDiffs.length] = part;
            }
        });
        return filteredDiffs;
    } else {
        return diffs;
    }

}

function diffProperties(leftProperties, rightProperties) {
    if (typeof leftProperties !== 'object' ||
        typeof rightProperties !== 'object') {
        return [];
    }
    const leftKeys = Object.keys(leftProperties).sort();
    const rightKeys = Object.keys(rightProperties).sort();
    let i = 0,
        j = 0;
    const diffs = [];

    debug('leftKeys.length =  %s, rightKeys.length =  %s', leftKeys.length, rightKeys.length )

    while (i < leftKeys.length || j < rightKeys.length) {

        const left = leftKeys[i];
        const right = rightKeys[j];
        if (left === right) {
            i++;
            j++;
        }
        if (left < right) {
            i++;
            diffs[diffs.length] = {
                count: 1,
                removed: true,
                value: left
            };
        }

        if (left > right) {
            j++;
            diffs[diffs.length] = {
                count: 1,
                added: true,
                value: right
            };
        }
    }
    return diffs;
}

export {
    diffProperties,
    parseProperties,
    diff,
    TYPE,
    DIFF_TYPE
};