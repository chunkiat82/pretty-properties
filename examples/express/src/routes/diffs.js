router.post('/', async function (req, res, next) {
        const keys = [...new Set([...leftKeys, ...rightKeys])];
            diffsArray[diffsArray.length] = JsDiff.createPatch(key,
                leftValue || '', rightValue || '',
                leftValue ? type : '/dev/null', rightValue ? type : '/dev/null');
            if (leftValue === undefined) {
                diffsArray[diffsArray.length] = 'new file mode 100644\n' + diffsArray[diffsArray.length];
            }
            console.log(`rightValue=${rightValue}`);
            if (rightValue === undefined) {
                diffsArray[diffsArray.length] = 'deleted file mode 100644\n' + diffsArray[diffsArray.length];
            }
        console.log(diffsArray);