import { Schema, Document, typeCheckMap, isObject } from './imports.js';

const TYPE = 'type';
const requiredProps = [TYPE];

describe('SCHEMA', () => {
    describe('constructor', () => {
        it('Each field of returned object is a non-array object', () => {
            const keyMetaData = {
                fieldA: { type: 'string' },
                fieldB: { type: 'number', required: true },
                fieldC: { type: 'array', required: true },
                fieldD: { type: 'object' },
            };
            const schema = new Schema(keyMetaData);

            for (const key of Object.keys(schema))
                expect(isObject(schema[key])).toBe(true);
        });
        it('Each field of returned object has required properties (e.g. type)', () => {
            const keyMetaData = {
                fieldA: { type: 'string' },
                fieldB: { type: 'number', required: true },
                fieldC: { type: 'array', required: true },
                fieldD: { type: 'object' },
            };
            const schema = new Schema(keyMetaData);

            for (const key of Object.keys(schema)) {
                for (const prop of requiredProps) {
                    expect(Object.keys(schema[key]).includes(prop)).toBe(true);
                }
            }
        });
        it('Each field of returned object has valid property values', () => {
            const keyMetaData = {
                fieldA: { type: 'string' },
                fieldB: { type: 'number', required: true },
                fieldC: { type: 'array', required: true },
                fieldD: { type: 'object' },
            };
            const schema = new Schema(keyMetaData);

            for (const key of Object.keys(schema)) {
                for (const prop of requiredProps) {
                    if (prop === 'type') {
                        const type = prop;
                        expect(
                            Object.keys(typeCheckMap).includes(
                                schema[key][type],
                            ),
                        ).toBe(true);
                    }
                }
            }
        });
        it('Returned object has all keyMetaData fields', () => {
            const keyMetaData = {
                fieldA: { type: 'string' },
                fieldB: { type: 'number', required: true },
                fieldC: { type: 'array', required: true },
                fieldD: { type: 'object' },
            };
            const schema = new Schema(keyMetaData);

            for (const key of Object.keys(keyMetaData)) {
                expect(keyMetaData[key]).toBe(schema[key]);
            }
        });
        it('Throws TypeError if keyMetaData is a non-array object', () => {
            const errs = [];
            try {
                const keyMetaData = [];
                new Schema(keyMetaData);
            } catch (err) {
                errs.push(err);
            }
            expect(errs.length).toBe(1);
            expect(errs[0] instanceof TypeError).toBe(true);
        });
        it('Throws TypeError if keyMetaData contains a non-array object', () => {
            const errs = [];
            try {
                const keyMetaData = {
                    fieldA: { type: 'string' },
                    fieldB: { type: 'number', required: true },
                    fieldC: { type: 'array', required: true },
                    fieldD: [],
                };
                new Schema(keyMetaData);
            } catch (err) {
                errs.push(err);
            }
            expect(errs.length).toBe(1);
            expect(errs[0] instanceof TypeError).toBe(true);
        });
        it('Throws Error if keyMetaData fields contain an invalid property', () => {
            const errs = [];
            try {
                const keyMetaData = {
                    fieldA: { type: 'string' },
                    fieldB: { type: 'number', required: true },
                    fieldC: { type: 'array', required: true },
                    fieldD: { type: 'object', invalidProp: true },
                };
                new Schema(keyMetaData);
            } catch (err) {
                errs.push(err);
            }
            expect(errs.length).toBe(1);
            expect(errs[0] instanceof Error).toBe(true);
        });
        it('Throws Error if keyMetaData fields do not contain required properties (e.g. type)', () => {
            const errs = [];
            try {
                const keyMetaData = {
                    fieldA: { type: 'string' },
                    fieldB: { type: 'number', required: true },
                    fieldC: { type: 'array', required: true },
                    fieldD: { required: true }, // No required properties
                };
                new Schema(keyMetaData);
            } catch (err) {
                errs.push(err);
            }
            expect(errs.length).toBe(1);
            expect(errs[0] instanceof Error).toBe(true);
        });
        it('Throws TypeError if keyMetaData fields contain an invalid property value (e.g. type: undefined; required: 1)', () => {
            const errs = [];
            try {
                const keyMetaData = {
                    fieldA: { type: undefined },
                    fieldB: { type: 'number', required: true },
                    fieldC: { type: 'array', required: true },
                    fieldD: { type: 'object' },
                };
                new Schema(keyMetaData);
            } catch (err) {
                errs.push(err);
            }
            expect(errs.length).toBe(1);
            expect(errs[0] instanceof TypeError).toBe(true);
        });
    });

    describe('validateDoc', () => {
        it('Returns true if passed document has all required properties and valid property values', () => {
            const keyMetaData = {
                fieldA: { type: 'string' },
                fieldB: { type: 'number', required: true },
                fieldC: { type: 'array', required: true },
                fieldD: { type: 'object' },
            };
            const schema = new Schema(keyMetaData);

            const document = new Document({
                fieldA: '',
                fieldB: 0,
                fieldC: [],
            });

            expect(schema.validateDoc(document)).toBe(true);
        });
        it('Returns false if passed document is not Document', () => {
            const keyMetaData = {
                fieldA: { type: 'string' },
                fieldB: { type: 'number', required: true },
                fieldC: { type: 'array', required: true },
                fieldD: { type: 'object' },
            };
            const schema = new Schema(keyMetaData);

            const document = { fieldA: '', fieldB: 0, fieldC: [] };

            expect(!schema.validateDoc(document)).toBe(true);
        });
        it('Returns false if passed document does not have all required properties (e.g. type)', () => {
            const keyMetaData = {
                fieldA: { type: 'string' },
                fieldB: { type: 'number', required: true },
                fieldC: { type: 'array', required: true },
                fieldD: { type: 'object' },
            };
            const schema = new Schema(keyMetaData);

            const document = new Document({ fieldA: '', fieldC: [] });

            expect(!schema.validateDoc(document)).toBe(true);
        });
        it('Returns false if passed document does not have valid property values (e.g. type: "string"; required: true)', () => {
            const keyMetaData = {
                fieldA: { type: 'string' },
                fieldB: { type: 'number', required: true },
                fieldC: { type: 'array', required: true },
                fieldD: { type: 'object' },
            };
            const schema = new Schema(keyMetaData);

            const document = new Document({
                fieldA: 0,
                fieldB: '',
                fieldC: true,
                fieldD: [],
            });

            expect(!schema.validateDoc(document)).toBe(true);
        });
    });
});
