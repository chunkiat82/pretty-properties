/*eslint no-undef: "off"*/
/**
 * pretty-properties
 *
 * Copyright © 2017 Raymond Ho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
    expect
} from 'chai';
import {
    parseProperties
} from '../src/PrettyProperties';

describe('PrettyProperties', () => {

    describe('PrettyProperties getProperty()', () => {

        it('should return string', async() => {
            const properties = await parseProperties(__dirname + '/samples/test1.properties');
            const a = properties.getProperty('a');
            expect(a).to.be.equal('a');
            expect(typeof a).to.be.equal('string');
        });

        it('should return JSON Object', async() => {
            const properties = await parseProperties(__dirname + '/samples/test1.properties');
            const l = properties.getProperty('l');
            const expected = {
                "hello": "world"
            };
            expect(l).to.deep.equal(expected);
            expect(typeof l).to.be.equal('object');
        });

    });

});