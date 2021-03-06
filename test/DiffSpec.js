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
import fs from 'fs';
import {
    parseProperties,
    diff,
    TYPE,
    DIFF_TYPE,
    unifiedDiffProperties
} from '../src/index';

import PrettyProperties from '../src/index';

describe('Diff Test', () => {

    describe('JSON diff', () => {

        it('should have 4 diffs which include 1 addedd and 1 removed diff', async() => {
            const propertiesLeft = await parseProperties(__dirname + '/samples/test2.A.properties');
            const propertiesRight = await parseProperties(__dirname + '/samples/test2.B.properties');
            const valueLeft = propertiesLeft.getProperty('j');
            const valueRight = propertiesRight.getProperty('j');
            const diffs = diff(valueLeft, valueRight, {
                type: TYPE.JSON,
                diffType: DIFF_TYPE.WORDS,
                fullDiff: true
            });

            expect(diffs[0].count).to.deep.equal(144);
            expect(diffs[1].value.trim()).to.deep.equal('"longitude": "111.741686",');
            expect(diffs[2].value.trim()).to.deep.equal('"longitude": "113.198200000",');
            expect(diffs[3].count).to.deep.equal(313);
        });

        it('should have 2 diffs and only 1 addedd and 1 removed diff', async() => {
            const propertiesLeft = await parseProperties(__dirname + '/samples/test2.A.properties');
            const propertiesRight = await parseProperties(__dirname + '/samples/test2.B.properties');
            const valueLeft = propertiesLeft.getProperty('j');
            const valueRight = propertiesRight.getProperty('j');
            const diffs = diff(valueLeft, valueRight, {
                type: TYPE.JSON,
                diffType: DIFF_TYPE.WORDS,
                fullDiff: false
            });

            expect(diffs[0].value.trim()).to.deep.equal('"longitude": "111.741686",');
            expect(diffs[1].value.trim()).to.deep.equal('"longitude": "113.198200000",');
        });

    });

    describe('String diff', () => {

        it('should have 4 diffs which 1 addedd and 1 removed diff', async() => {
            const propertiesLeft = await parseProperties(__dirname + '/samples/test3.A.properties');
            const propertiesRight = await parseProperties(__dirname + '/samples/test3.B.properties');
            const valueLeft = propertiesLeft.getProperty('a');
            const valueRight = propertiesRight.getProperty('a');
            const diffs = diff(valueLeft, valueRight, {
                type: TYPE.STRING,
                diffType: DIFF_TYPE.WORDS,
                fullDiff: true
            });

            expect(diffs[0].count).to.deep.equal(2);
            expect(diffs[1].value.trim()).to.deep.equal('cultivated');
            expect(diffs[2].value.trim()).to.deep.equal('atas');
            expect(diffs[3].count).to.deep.equal(19);
        });

        it('should have 2 diffs and only 1 addedd and 1 removed diff', async() => {
            const propertiesLeft = await parseProperties(__dirname + '/samples/test3.A.properties');
            const propertiesRight = await parseProperties(__dirname + '/samples/test3.B.properties');
            const valueLeft = propertiesLeft.getProperty('a');
            const valueRight = propertiesRight.getProperty('a');
            const diffs = diff(valueLeft, valueRight, {
                type: TYPE.STRING,
                diffType: DIFF_TYPE.WORDS,
                fullDiff: false
            });

            expect(diffs[0].value.trim()).to.deep.equal('cultivated');
            expect(diffs[1].value.trim()).to.deep.equal('atas');
        });
    });

    describe('JSON Big diff with JSON files', () => {

        it('testing with parsing JSON files directly', async () => {

            var left = fs.readFileSync(__dirname + '/samples/big.1.json');
            var right = fs.readFileSync(__dirname + '/samples/big.2.json');

            const pp1 = new PrettyProperties(JSON.parse(left));
            const pp2 = new PrettyProperties(JSON.parse(right));            

            unifiedDiffProperties(pp1, pp2).then(diffs => {                
                expect(diffs[1].trim()).equal('Index: about\n===================================================================\n--- about\ttext\n+++ about\ttext\n@@ -1,1 +1,1 @@\n-Consequat deserunt laboris esse id labore aute cillum. Esse reprehenderit et culpa fugiat velit voluptate qui laboris laborum commodo est. Ut ipsum et quis consequat irure anim eu reprehenderit laboris dolor. Pariatur pariatur consequat minim do elit elit fugiat sint sit cupidatat sunt amet in aliquip. Nulla officia labore reprehenderit enim officia. Duis eiusmod do do aliqua ut magna ullamco.\r\n+Ut non et elit in proident. Cupidatat ea sit quis veniam excepteur sunt non consectetur consequat occaecat. Amet consectetur id aliquip tempor esse anim nisi. Officia Lorem mollit eu exercitation dolor ea eiusmod sit aliquip occaecat. Laborum deserunt exercitation incididunt incididunt commodo elit occaecat nostrud.');
            }).catch(() =>{
                expect.fail();
            });

        });
    });
});