const isObject = require('./__utils__/isObject.js');
const constKeys = require('./__utils__/constKeys.js');
const typeCheckMap = require('./__utils__/typeCheckMap.js');
const Document = require('./Document.js');
const CoreError = require('./__utils__/CoreError.js');

class Schema {
    constructor(keyMetaData) {
        if (!isObject(keyMetaData)) throw new CoreError('Invalid Type: content must be object');
        for (const key in keyMetaData) {
            if (!isObject(keyMetaData[key])) throw new CoreError('Invalid Type: content must be object');
            this[key] = keyMetaData[key];
        }
    }
    validateDoc(document) {
        if (!(document instanceof Document)) {
            throw new CoreError('Invalid Type: document must be an instance of document');
        }

        // Check all required document fields are present and valid
        for (const key of Object.keys(this)) {
            const { required = false, type } = this[key];
            const value = document[key];

            if (required && value === undefined) {
                throw new CoreError(`Missing required field: '${key}'`);
            }

            if (value !== undefined) {
                if (!typeCheckMap[type]) {
                    throw new CoreError(`Unsupported type '${type}' in document for key '${key}'`);
                }
                if (!typeCheckMap[type](value)) {
                    throw new CoreError(`Type mismatch on key '${key}': expected '${type}'`);
                }
            }
        }

        // Check that no extraneous fields exist on document
        for (const key of Object.keys(this)) {
            if (constKeys.includes(key)) continue;
            if (!this.hasOwnProperty(key)) {
                throw new CoreError(`Unexpected field '${key}' not defined in document`);
            }
        }

        return true;
    }
}

module.exports = Schema;