const isObject = require('../__utils__/isObject.js');
const CoreError = require('../__utils__/CoreError.js');

const constKeys = ['_id', 'createdAt'];

class Document {
    constructor(content) {
        if (!isObject(content)) throw new CoreError('Invalid Type: content must be object');
        for (const key in content) {
            this[key] = content[key];
        }
    }
    static mergeUpdate(document, updatedKeys) {
        for (const key in updatedKeys) {
            if (constKeys.includes(key)) continue;
            document[key] = updatedKeys[key];
        }

        return document;
    }
        validateDoc(schema) {
        if (typeof schema !== 'object' || typeof schema.constructor !== 'function' || schema.constructor.name !== 'Schema') {
            throw new CoreError('Invalid Type: schema must be an instance of Schema');
        }

        // Check all required schema fields are present and valid
        for (const key in schema) {
            const { required = false, type } = schema[key];
            const value = this[key];

            if (required && value === undefined) {
                throw new CoreError(`Missing required field: '${key}'`);
            }

            if (value !== undefined) {
                if (!typeCheckMap[type]) {
                    throw new CoreError(`Unsupported type '${type}' in schema for key '${key}'`);
                }
                if (!typeCheckMap[type](value)) {
                    throw new CoreError(`Type mismatch on key '${key}': expected '${type}'`);
                }
            }
        }

        // Check that no extraneous fields exist on document
        for (const key in this) {
            if (constKeys.includes(key)) continue;
            if (!schema.hasOwnProperty(key)) {
                throw new CoreError(`Unexpected field '${key}' not defined in schema`);
            }
        }

        return true;
    }
}

module.exports = Document;