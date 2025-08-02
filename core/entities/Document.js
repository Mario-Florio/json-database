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
}

module.exports = Document;