import { Document, constKeys, isObject } from './imports.js';

describe('DOCUMENT', () => {
    describe('constructor', () => {
        it('Returns non-array object with passed content data', () => {
            const content = { propA: 'a', propB: 'b' };
            const document = new Document(content);

            expect(isObject(document)).toBe(true);
            for (const key of Object.keys(content)) {
                expect(document[key] && document[key] === content[key]).toBe(
                    true,
                );
            }
        });
        it('No properties not in content (except _id) exist on constructed object', () => {
            const content = { propA: 'a', propB: 'b' };
            const document = new Document(content);

            for (const key of Object.keys(document)) {
                if (key === '_id') continue;
                expect(content[key]).toBeTruthy();
            }
        });
    });

    describe('hasKeys', () => {
        it('Returns true if document has all keys key:value pairs (structurally equal', () => {
            const keyA = { propA: 'a' };
            const keyB = { propB: 'b' };
            const keyC = { propC: 'c' };
            const content = { ...keyA, ...keyB, ...keyC };
            const document = new Document(content);

            expect(document.hasKeys(keyA)).toBe(true);
            expect(document.hasKeys(keyB)).toBe(true);
            expect(document.hasKeys({ ...keyA, ...keyC })).toBe(true);
        });
        it('Returns false if document does not have all keys key:value pairs', () => {
            const keyA = { propA: 'a' };
            const keyB = { propB: 'b' };
            const keyC = { propC: 'c' };
            const content = { ...keyA };
            const document = new Document(content);

            expect(!document.hasKeys(keyB)).toBe(true);
            expect(!document.hasKeys({ ...keyA, ...keyC })).toBe(true);
        });
    });
    describe('mergeKeys', () => {
        it('Returns an instance of Document', () => {
            const keyA = { propA: 'a' };
            const keyB = { propB: 'b' };
            const keyC = { propC: 'c' };
            const content = { ...keyA };
            const document = new Document(content);

            const updatedDoc = document.mergeKeys({ ...keyB, ...keyC });

            expect(updatedDoc instanceof Document).toBe(true);
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
                expect(
                    updatedDoc[key] && updatedDoc[key] === newKeys[key],
                ).toBe(true);
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
                expect(document[key] && document[key] === newKeys[key]).toBe(
                    true,
                );
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
                expect(document[key] === key).toBe(true);
            }
        });
        it('Throws TypeError if passed keys is a non-array object', () => {
            const errs = [];
            try {
                const content = { propA: 'a' };
                const document = new Document(content);

                document.mergeKeys([]);
            } catch (err) {
                errs.push(err);
            }
            expect(errs.length).toBe(1);
            expect(errs[0] instanceof TypeError).toBe(true);
        });
    });
});
