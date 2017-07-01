/**
 * pretty-properties
 *
 * Copyright © 2017 Raymond Ho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import properties from 'properties';
import Promise from 'promise';

const TYPE = { JSON:'json', STRING:'string' };

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

    getPropertyAndType(key){
        const value = this.props[key];
        try {
            /* possible to cache */
            const json = JSON.parse(value);
            return { type: TYPE.JSON, value:json };
        } catch (e) {
            return { type: TYPE.STRING, value };;
        }
    }

}

async function parseProperties(filename) {
    return new Promise((resolve, reject) => {
        properties.parse(filename, {
            path: true
        }, function(error, obj) {
            error ? reject(error) : resolve(new PrettyProperties(obj));
        });
    });
}

export default PrettyProperties;

export {
    parseProperties
};