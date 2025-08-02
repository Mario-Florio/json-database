const isObject = require('../__utils__/isObject.js');
const CoreError = require('../__utils__/CoreError.js');

class Schema {
    constructor(keyMetaData) {
        if (!isObject(keyMetaData)) throw new CoreError('Invalid Type: content must be object');
        for (const key in keyMetaData) {
            if (!isObject(keyMetaData[key])) throw new CoreError('Invalid Type: content must be object');
            this[key] = keyMetaData[key];
        }
    }
}

module.exports = Schema;