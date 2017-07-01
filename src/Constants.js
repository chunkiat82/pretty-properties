const TYPE = Object.freeze({ JSON:'json', STRING:'string' });
const DIFF_TYPE = Object.freeze({ LINES:'lines', WORDS:'words' });
const MAPPING_TYPE = { jsonwords : 'diffJson', jsonlines : 'diffJson', stringwords:  'diffWords', stringline: 'diffLines' };

export { TYPE, DIFF_TYPE, MAPPING_TYPE };