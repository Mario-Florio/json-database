import {
    Document,
    constKeys,
    isObject,
    it, assert
} from './imports.js';

console.log('-----DOCUMENT-----');

console.log('   CONSTRUCTOR');
it('Returns non-array object with passed content data', () => {

    const content = { propA: 'a', propB: 'b' };
    const document = new Document(content);

    assert(isObject(document));
    for (const key of Object.keys(content)) {
        assert(document[key] && document[key] === content[key]);
    }
});
it('No properties not in content (except _id) exist on constructed object', () => {

    const content = { propA: 'a', propB: 'b' };
    const document = new Document(content);

    for (const key of Object.keys(document)) {
        if (key === '_id') continue;
        assert(content[key]);
    }
});

console.log('   HAS_KEYS');
it('Returns true if document has all keys key:value pairs (structurally equal', () => {

    const keyA = { propA: 'a' };
    const keyB = { propB: 'b' };
    const keyC = { propC: 'c' };
    const content = { ...keyA, ...keyB, ...keyC };
    const document = new Document(content);

    assert(document.hasKeys(keyA));
    assert(document.hasKeys(keyB));
    assert(document.hasKeys({ ...keyA, ...keyC }));
});
it('Returns false if document does not have all keys key:value pairs', () => {

    const keyA = { propA: 'a' };
    const keyB = { propB: 'b' };
    const keyC = { propC: 'c' };
    const content = { ...keyA };
    const document = new Document(content);

    assert(!document.hasKeys(keyB));
    assert(!document.hasKeys({ ...keyA, ...keyC }));
});

console.log('   MERGE_KEYS');
it('Returns an instance of Document', () => {

    const keyA = { propA: 'a' };
    const keyB = { propB: 'b' };
    const keyC = { propC: 'c' };
    const content = { ...keyA };
    const document = new Document(content);

    const updatedDoc = document.mergeKeys({ ...keyB, ...keyC });

    assert(updatedDoc instanceof Document);
});
it('Returns object with modified key:value pairs', () => {

    const keyA = { propA: 'a' };
    const keyB = { propB: 'b' };
    const keyC = { propC: 'c' };
    const updatedKeyA = { propA: 'A' };
    const content = { ...keyA };
    const document = new Document(content);

    const newKeys = { ...updatedKeyA, ...keyB, ...keyC };
    const updatedDoc = document.mergeKeys(newKeys);
    
    for (const key of Object.keys(newKeys)) {
        assert(updatedDoc[key] && updatedDoc[key] === newKeys[key]);
    }
});
it('Mutates initial document with modified key:value pairs', () => {

    const keyA = { propA: 'a' };
    const keyB = { propB: 'b' };
    const keyC = { propC: 'c' };
    const updatedKeyA = { propA: 'A' };
    const content = { ...keyA };
    const document = new Document(content);

    const newKeys = { ...updatedKeyA, ...keyB, ...keyC };
    document.mergeKeys(newKeys);
    
    for (const key of Object.keys(newKeys)) {
        assert(document[key] && document[key] === newKeys[key]);
    }
});
it('Does not modify constant keys', () => {

    const keyA = { propA: 'a' };
    const keyB = { propB: 'b' };
    const keyC = { propC: 'c' };
    const content = { ...keyA };
    for (const key of constKeys) content[key] = key;
    const document = new Document(content);

    const updatedKeys = { ...keyB, ...keyC };
    for (const key of constKeys) updatedKeys[key] = 'updated';

    document.mergeKeys(updatedKeys);

    for (const key of constKeys) {
        assert(document[key] === key);
    }
});
it('Throws TypeError if passed keys is a non-array object', () => {
    const errs = [];
    try {

        const content = { propA: 'a' };
        const document = new Document(content);

        const res = document.mergeKeys([]);

    } catch(err) {
        errs.push(err);
    }
    assert(errs.length === 1);
    assert(errs[0] instanceof TypeError);
});
