const isObject = require('./__utils__/isObject.js');
const constKeys = require('./__utils__/constKeys.js');
const { must } = require('../../shared/contracts/contracts.js');

class Document {
    constructor(content) {
        must (isObject(content), 'Invalid Type — content must be object');
        for (const key in content) {
            this[key] = content[key];
        }
    }
    hasKeys(keys) {
        must(isObject(keys) || keys === undefined, 'Invalid Type — provided keys must be a non-array object or undefined');
        for (const key in keys) {
            if (this[key] !== keys[key]) return false;
        }
        return true;
    }
    mergeKeys(keys) {
        if (!isObject(keys)) throw new TypeError('keys must be a non-array object');
        for (const key in keys) {
            if (constKeys.includes(key)) continue;
            this[key] = keys[key];
        }

        return this;
    }
}

module.exports = Document;