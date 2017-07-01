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
            const { value, type } = properties.getPropertyAndType('l');
            const expected = {
                "hello": "world"
            };
            expect(value).to.deep.equal(expected);
            expect(typeof value).to.be.equal('object');
            expect(type).to.be.equal('json');
        });

        it('should return string and Type to be string', async() => {
            const properties = await parseProperties(__dirname + '/samples/test1.properties');
            const { value, type } = properties.getPropertyAndType('a');            
            expect(value).to.be.equal('a');
            expect(typeof value).to.be.equal('string');
            expect(type).to.be.equal('string');
        });

        it('should return whole Object', async() => {
            const properties = await parseProperties(__dirname + '/samples/test1.properties');
            const all = properties.getProperties();
            const expected = {
                "hello": "world"
            };
            expect(JSON.parse(all.l)).to.deep.equal(expected);
            expect(typeof JSON.parse(all.l)).to.be.equal('object');

            expect(all.a).to.be.equal('a');
            expect(typeof all.a).to.be.equal('string');
        });

    });

});