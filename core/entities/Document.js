const isObject = require('./__utils__/isObject.js');
const constKeys = require('./__utils__/constKeys.js');
const CoreError = require('./__utils__/CoreError.js');

class Document {
    constructor(content) {
        if (!isObject(content)) throw new CoreError('Invalid Type: content must be object');
        for (const key in content) {
            this[key] = content[key];
        }
    }
    hasKeys(keys) {
        for (const key in keys) {
            if (this[key] !== keys[key]) return false;
        }
        return true;
    }
    mergeKeys(keys) {
        for (const key in keys) {
            if (constKeys.includes(key)) continue;
            this[key] = keys[key];
        }

        return this;
    }
}

module.exports = Document;