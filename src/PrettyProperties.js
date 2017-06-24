/**
 * pretty-properties
 *
 * Copyright © 2017 Raymond Ho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const properties = require("properties");


class PrettyProperties {

    constructor(props) {
        this.props = props;
    }

    getProperties() {
        return Object.freeze(this.props);
    }

    getProperty(key) {
        const value = this.props[key];
        try {
            /* possible to cache */
            return JSON.parse(value);
        } catch (e) {
            return value; 
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

export { parseProperties };