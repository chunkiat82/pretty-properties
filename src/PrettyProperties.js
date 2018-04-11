/**
 * pretty-properties
 *
 * Copyright © 2017 Raymond Ho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import { diffProperties, isValidJSON } from './Helper';
import { TYPE } from './Constants';
import debugLib from 'debug';
const debug = debugLib('prettyproperties');

class PrettyProperties {

    /* can do better in constructor */
    constructor(props) {
        this.props = props;
    }

    getProperties() {
        return Object.freeze(this.props);
    }

    getProperty(key) {
        /* can optimize later */
        const { value } = this.getPropertyAndType(key);
        return value;
    }

    getPropertyAndType(key) {
        const value = this.props[key];
        let returnValue = null;
        try {
            /* possible to cache */
            const json = JSON.parse(value);
            if (isValidJSON(json)) {
                debug('Valid JSON after first Parsing');
                returnValue = { type: TYPE.JSON, value:json };
            } else {
                debug('InValid JSON after first Parsing');
                returnValue = { type: TYPE.STRING, value:value };
            }
        } catch (e) {
            try {
                // this is very special case to be extracted next time
                let replacedValue = value.replace(/\\,/g, ",")
                replacedValue = replacedValue.replace(/[\r\t\n]/g, '');
                const retryJson = JSON.parse(replacedValue);
                if (isValidJSON(retryJson)) {
                    debug('Valid JSON after first exception');
                    returnValue = { type: TYPE.JSON, value:retryJson };
                } else {
                    debug('InValid JSON after first exception');
                    returnValue = { type: TYPE.STRING, value:value };
                }
            } catch (e1) {
                debug('InValid JSON after second exception');
                returnValue = { type: TYPE.STRING, value };
            }
        }
        return returnValue;
    }
    
    getDiff(props) {
        return diffProperties(this.props, props);
    }

}
export default PrettyProperties;