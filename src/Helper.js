/**
 * pretty-properties
 *
 * Copyright © 2017 Raymond Ho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/*eslint no-undef: "off"*/

import 'colors';
import * as JsDiff from 'diff';
import debugLib from 'debug';
import properties from 'properties';
const debug = debugLib('prettyproperties');

import PrettyProperties from './index';
import {
    TYPE,
    DIFF_TYPE,
    MAPPING_TYPE
} from './Constants';

async function parseProperties(filename, path) {
    return new Promise((resolve, reject) => {
        properties.parse(filename, {
            path: !path,
            separators: "="
        }, function (error, obj) {
            error ? reject(error) : resolve(new PrettyProperties(obj));
        });
    });
}

function diff(left, right, options = {
    type: TYPE.STRING,
    diffType: DIFF_TYPE.LINES,
    fullDiff: true
}) {
    debug('left type = %s, right type =%s', typeof left, typeof right);

    debug('MAPPING_TYPE[options.type + options.diffType] = %s', MAPPING_TYPE[options.type + options.diffType]);
    const diffFunction = JsDiff[MAPPING_TYPE[options.type + options.diffType]]
    const diffs = diffFunction(left, right);

    if (debug.enabled) {
        debug(`left=${JSON.stringify(left, null, 2)}`);
        debug(`right=${JSON.stringify(right, null, 2)}`)
        debug(`JSON diffs=${JSON.stringify(diffs, null, 2)}`);
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

function diffProperties(leftPrettyProperties, rightPrettyProperties) {

    if (!(leftPrettyProperties instanceof PrettyProperties) ||
        !(rightPrettyProperties instanceof PrettyProperties)) {
        debug('leftProperties Type =  %s, rightProperties Type =  %s', typeof leftProperties, typeof rightProperties);
        return [];
    }

    debug('Starting Diff Properties');

    const leftProperties = leftPrettyProperties.getProperties();
    const rightProperties = rightPrettyProperties.getProperties();

    const leftKeys = Object.keys(leftProperties).sort();
    const rightKeys = Object.keys(rightProperties).sort();
    let i = 0,
        j = 0;
    const diffs = [];

    debug('leftKeys.length =  %s, rightKeys.length =  %s', leftKeys.length, rightKeys.length)

    while (i < leftKeys.length && j < rightKeys.length) {

        const left = leftKeys[i];
        const right = rightKeys[j];
        debug('left = %s, right =%s', left, right);

        if (left === right) {
            debug(`${left} ${right} same`);
            i++;
            j++;

            const leftPT = leftPrettyProperties.getPropertyAndType(left);
            const rightPT = rightPrettyProperties.getPropertyAndType(right);
            let contentDiff = [];
            if (leftPT.type === rightPT.type && rightPT.type === TYPE.JSON) {
                debug(`${TYPE.JSON}`);
                contentDiff = diff(leftPT.value, rightPT.value, {
                    type: TYPE.JSON,
                    diffType: DIFF_TYPE.WORDS,
                    fullDiff: true
                });
            } else {
                contentDiff = diff(leftPT.value, rightPT.value);
            }

            // adding to the main array
            diffs[diffs.length] = {
                existing: true,
                key: left,
                diff: contentDiff,
                left: leftProperties[left],
                right: rightProperties[right]
            };
        } else if (left < right) {
            debug(`${left} ${right} left < right`);
            i++;
            diffs[diffs.length] = {
                removed: true,
                key: left,
                value: leftProperties[left]
            };

        } else if (left > right) {
            debug(`${left} ${right} left > right`);
            j++;
            diffs[diffs.length] = {
                added: true,
                key: right,
                value: rightProperties[right]
            };
        }

        debug('i = %s, j = %s', i, j);
    }
    debug('main loop completed');

    for (let k = j; k < rightKeys.length; k++) {
        diffs[diffs.length] = {
            added: true,
            key: rightKeys[k],
            value: rightProperties[rightKeys[k]]
        };
    }

    debug('rightKeys loop completed');

    for (let k = i; k < leftKeys.length; k++) {
        diffs[diffs.length] = {
            removed: true,
            key: leftKeys[k],
            value: leftProperties[leftKeys[k]]
        };
    }

    debug('leftKeys loop completed');

    return diffs;
}

async function unifiedDiffProperties(leftProperties, rightProperties) {
    const diffsArray = [];
    // const leftProperties = await parseProperties(leftText, true);
    const left = leftProperties.getProperties();
    // const rightProperties = await parseProperties(rightText, true);
    const right = rightProperties.getProperties();

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
        

        if (leftType !== rightType || leftType === 'string') {
            
            if (rightType === 'json'){                
                leftValue = leftValue === undefined ? undefined : String(leftValue);
                rightValue = rightValue === undefined ? undefined : JSON.stringify(rightValue, null, 2);
                type = 'json';
            } else {
                leftValue = leftValue === undefined ? undefined : String(leftValue);
                rightValue = rightValue === undefined ? undefined : String(rightValue);
                type = 'text';
            }            
        } else {
            leftValue = JSON.stringify(leftValue, null, 2);
            rightValue = JSON.stringify(rightValue, null, 2);
        }

        if (leftValue === rightValue) return;

        diffsArray[diffsArray.length] = JsDiff.createPatch(key,
            leftValue || '', rightValue || '',
            leftValue ? type : '/dev/null', rightValue ? type : '/dev/null');

        // currently hardcoded for new property detection
        if (leftValue === undefined) {
            diffsArray[diffsArray.length - 1] = diffsArray[diffsArray.length - 1] + 'new file mode 100644';
        }

        // currently hardcoded for missing property detection
        if (rightValue === undefined) {
            diffsArray[diffsArray.length - 1] = diffsArray[diffsArray.length - 1] + 'deleted file mode 100644';
        }
    });
    return diffsArray;
}

const isValidJSON = (val) => val instanceof Array || val instanceof Object ? true : false;

export {
    unifiedDiffProperties,
    diffProperties,
    parseProperties,
    diff,
    TYPE,
    DIFF_TYPE,
    isValidJSON
};