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

class PrettyProperties {

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
                returnValue = { type: TYPE.JSON, value:json };
            } else {
                returnValue = { type: TYPE.STRING, value:value };
            }            
        } catch (e) {
            returnValue = { type: TYPE.STRING, value };
        }
        return returnValue;
    }
    
    getDiff(props) {
        return diffProperties(this.props, props);
    }

}
export default PrettyProperties;