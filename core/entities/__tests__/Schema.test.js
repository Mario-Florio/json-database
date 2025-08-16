const {
    Schema,
    Document,
    typeCheckMap,
    isObject,
    it, assert
} = require('./imports.js');

const TYPE = 'type';
const requiredProps = [TYPE];

console.log('------SCHEMA------');

console.log('   CONSTRUCTOR');
it('Each field of returned object is a non-array object', () => {
    const keyMetaData = {
        fieldA: { type: 'string' },
        fieldB: { type: 'number', required: true },
        fieldC: { type: 'array', required: true },
        fieldD: { type: 'object' }
    };
    const schema = new Schema(keyMetaData);

    for (const key of Object.keys(schema)) assert(isObject(schema[key]));
});
it('Each field of returned object has required properties (e.g. type)', () => {
    const keyMetaData = {
        fieldA: { type: 'string' },
        fieldB: { type: 'number', required: true },
        fieldC: { type: 'array', required: true },
        fieldD: { type: 'object' }
    };
    const schema = new Schema(keyMetaData);

    for (const key of Object.keys(schema)) {
        for (const prop of requiredProps) {
            assert(Object.keys(schema[key]).includes(prop));
        }
    }
});
it('Each field of returned object has valid property values', () => {
    const keyMetaData = {
        fieldA: { type: 'string' },
        fieldB: { type: 'number', required: true },
        fieldC: { type: 'array', required: true },
        fieldD: { type: 'object' }
    };
    const schema = new Schema(keyMetaData);

    for (const key of Object.keys(schema)) {
        for (const prop of requiredProps) {
            if (prop === 'type') {
                    const type = prop;
                    assert(Object.keys(typeCheckMap).includes(schema[key][type]));
            }
        }
    }
});
it('Returned object has all keyMetaData fields', () => {
    const keyMetaData = {
        fieldA: { type: 'string' },
        fieldB: { type: 'number', required: true },
        fieldC: { type: 'array', required: true },
        fieldD: { type: 'object' }
    };
    const schema = new Schema(keyMetaData);

    for (const key of Object.keys(keyMetaData)) {
        assert(keyMetaData[key] === schema[key]);
    }
});
it('Throws TypeError if keyMetaData is a non-array object', () => {
    const errs = [];
    try {
        const keyMetaData = [];
        new Schema(keyMetaData);
    } catch(err) {
        errs.push(err);
    }
    assert(errs.length === 1);
    assert(errs[0] instanceof TypeError);
});
it('Throws TypeError if keyMetaData contains a non-array object', () => {
    const errs = [];
    try {
        const keyMetaData = {
            fieldA: { type: 'string' },
            fieldB: { type: 'number', required: true },
            fieldC: { type: 'array', required: true },
            fieldD: []
        };
        new Schema(keyMetaData);

    } catch(err) {
        errs.push(err);
    }
    assert(errs.length === 1);
    assert(errs[0] instanceof TypeError);
});
it('Throws Error if keyMetaData fields contain an invalid property', () => {
    const errs = [];
    try {
        const keyMetaData = {
            fieldA: { type: 'string' },
            fieldB: { type: 'number', required: true },
            fieldC: { type: 'array', required: true },
            fieldD: { type: 'object', invalidProp: true }
        };
        new Schema(keyMetaData);

    } catch(err) {
        errs.push(err);
    }
    assert(errs.length === 1);
    assert(errs[0] instanceof Error);
});
it('Throws Error if keyMetaData fields do not contain required properties (e.g. type)', () => {
    const errs = [];
    try {
        const keyMetaData = {
            fieldA: { type: 'string' },
            fieldB: { type: 'number', required: true },
            fieldC: { type: 'array', required: true },
            fieldD: { required: true } // No required properties
        };
        new Schema(keyMetaData);

    } catch(err) {
        errs.push(err);
    }
    assert(errs.length === 1);
    assert(errs[0] instanceof Error);
});
it('Throws TypeError if keyMetaData fields contain an invalid property value (e.g. type: undefined; required: 1)', () => {
    const errs = [];
    try {
        const keyMetaData = {
            fieldA: { type: undefined },
            fieldB: { type: 'number', required: true },
            fieldC: { type: 'array', required: true },
            fieldD: { type: 'object' }
        };
        new Schema(keyMetaData);

    } catch(err) {
        errs.push(err);
    }
    assert(errs.length === 1);
    assert(errs[0] instanceof TypeError);
});

console.log('   VALIDATE_DOC');
it('Returns true if passed document has all required properties and valid property values', () => {
    const keyMetaData = {
        fieldA: { type: 'string' },
        fieldB: { type: 'number', required: true },
        fieldC: { type: 'array', required: true },
        fieldD: { type: 'object' }
    };
    const schema = new Schema(keyMetaData);

    const document = new Document({ fieldA: '', fieldB: 0, fieldC: [] });

    assert(schema.validateDoc(document));
});
it('Returns false if passed document is not Document', () => {
    const keyMetaData = {
        fieldA: { type: 'string' },
        fieldB: { type: 'number', required: true },
        fieldC: { type: 'array', required: true },
        fieldD: { type: 'object' }
    };
    const schema = new Schema(keyMetaData);

    const document = { fieldA: '', fieldB: 0, fieldC: [] };

    assert(!schema.validateDoc(document));
});
it('Returns false if passed document does not have all required properties (e.g. type)', () => {
    const keyMetaData = {
        fieldA: { type: 'string' },
        fieldB: { type: 'number', required: true },
        fieldC: { type: 'array', required: true },
        fieldD: { type: 'object' }
    };
    const schema = new Schema(keyMetaData);

    const document = new Document({ fieldA: '' , fieldC: [] });

    assert(!schema.validateDoc(document));
});
it('Returns false if passed document does not have valid property values (e.g. type: "string"; required: true)', () => {
    const keyMetaData = {
        fieldA: { type: 'string' },
        fieldB: { type: 'number', required: true },
        fieldC: { type: 'array', required: true },
        fieldD: { type: 'object' }
    };
    const schema = new Schema(keyMetaData);

    const document = new Document({ fieldA: 0, fieldB: '', fieldC: true, fieldD: [] });

    assert(!schema.validateDoc(document))
});