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
    parseProperties,
    diffProperties
} from '../src/index';

describe('PrettyProperties', () => {

    describe('PrettyProperties getProperty()', () => {

        it('should return string', async() => {
            const properties = await parseProperties(__dirname + '/samples/test1.properties');
            const value = properties.getProperty('a');
            expect(value).to.be.equal('a');
            expect(typeof value).to.be.equal('string');
        });

        it('should return JSON Object', async() => {
            const properties = await parseProperties(__dirname + '/samples/test1.properties');
            const value = properties.getProperty('l');
            const expected = {
                "hello": "world"
            };
            expect(value).to.deep.equal(expected);
            expect(typeof value).to.be.equal('object');
        });

        it('should return JSON Object and Type to be json', async() => {
            const properties = await parseProperties(__dirname + '/samples/test1.properties');
            const {
                value,
                type
            } = properties.getPropertyAndType('l');
            const expected = {
                "hello": "world"
            };
            expect(value).to.deep.equal(expected);
            expect(typeof value).to.be.equal('object');
            expect(type).to.be.equal('json');
        });

        it('should return string and Type to be string', async() => {
            const properties = await parseProperties(__dirname + '/samples/test1.properties');
            const {
                value,
                type
            } = properties.getPropertyAndType('a');
            expect(value).to.be.equal('a');
            expect(typeof value).to.be.equal('string');
            expect(type).to.be.equal('string');
        });

        it('should return whole Object', async() => {
            const properties = await parseProperties(__dirname + '/samples/test1.properties');
            const all = properties.getProperties();
            expect(typeof JSON.parse(all.l)).to.be.equal('object');

            expect(all.a).to.be.equal('a');
            expect(typeof all.a).to.be.equal('string');
        });

    });

    describe('PrettyProperties getDiff()', () => {

        it('should return same keys and empty array', async() => {
            const propertiesLeft = await parseProperties(__dirname + '/samples/test4.A.properties');
            const propertiesRight = await parseProperties(__dirname + '/samples/test4.B.properties');
            const diffs = diffProperties(propertiesLeft, propertiesRight);
            expect(diffs).to.deep.equal(
                [{
                    "existing": true,
                    "key": "a",
                    "left": "a",
                    "right": "a",
                    "diff": [{
                        "count": 1,
                        "value": "a"
                    }]
                }]);

        });

        it('should return different keys in diff array', async() => {
            const propertiesLeft = await parseProperties(__dirname + '/samples/test5.A.properties');
            const propertiesRight = await parseProperties(__dirname + '/samples/test5.B.properties');
            const diffs = diffProperties(propertiesLeft, propertiesRight);
            expect(diffs).to.deep.equal(
                [{
                    "removed": true,
                    "value": "a",
                    "key": "a"
                },
                {
                    "added": true,
                    "value": "b",
                    "key": "b"
                }
                ]);
        });

        it('should return different keys in diff array', async() => {
            const propertiesLeft = await parseProperties(__dirname + '/samples/test7.A.properties');
            const propertiesRight = await parseProperties(__dirname + '/samples/test7.B.properties');
            const diffs = diffProperties(propertiesLeft, propertiesRight);
            expect(diffs).to.deep.equal(
                [{
                    "existing": true,
                    "key": "a",
                    "left": "a",
                    "right": "a",
                    "diff": [{
                        "count": 1,
                        "value": "a"
                    }]
                },
                {
                    "removed": true,
                    "key": "b",
                    "value": "b"
                },
                {
                    "added": true,
                    "key": "c",
                    "value": "c"
                }
                ]);
        });

        it('should return different keys in diff array', async() => {
            const propertiesLeft = await parseProperties(__dirname + '/samples/test8.A.properties');
            const propertiesRight = await parseProperties(__dirname + '/samples/test8.B.properties');
            const diffs = diffProperties(propertiesLeft, propertiesRight);
            expect(diffs).to.deep.equal(
                [{
                    "existing": true,
                    "key": "a",
                    "left": "a",
                    "right": "a",
                    "diff": [{
                        "count": 1,
                        "value": "a"
                    }]
                },
                {
                    "existing": true,
                    "key": "b",
                    "left": "b",
                    "right": "b",
                    "diff": [{
                        "count": 1,
                        "value": "b"
                    }]
                },
                {
                    "added": true,
                    "key": "c",
                    "value": "c"
                },
                {
                    "added": true,
                    "key": "d",
                    "value": "d"
                }
                ]);
        });

        it('should return different keys in diff array', async() => {
            const propertiesLeft = await parseProperties(__dirname + '/samples/test9.A.properties');
            const propertiesRight = await parseProperties(__dirname + '/samples/test9.B.properties');
            const diffs = diffProperties(propertiesLeft, propertiesRight);
            expect(diffs).to.deep.equal(
                [{
                    "existing": true,
                    "key": "a",
                    "left": "a",
                    "right": "a",
                    "diff": [{
                        "count": 1,
                        "value": "a"
                    }]
                },
                {
                    "added": true,
                    "key": "b",
                    "value": "b"
                },
                {
                    "removed": true,
                    "key": "c",
                    "value": "c"
                }
                ]);
        });

        it('should return different keys in diff array for JSON', async() => {
            // const propertiesLeft = await parseProperties(__dirname + '/samples/test10.A.properties');
            // const propertiesRight = await parseProperties(__dirname + '/samples/test10.B.properties');
            // const diffs = diffProperties(propertiesLeft, propertiesRight);
            // expect(diffs).to.deep.includes([]);
            // to be continued;
        });
    });
});