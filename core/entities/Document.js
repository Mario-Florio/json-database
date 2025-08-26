import QueryBuilder from './QueryBuilder.js';
import constKeys from './__utils__/constKeys.js';
import { isObject, uid, must } from './imports.js';

class Document {
    constructor(content) {
        must (isObject(content), 'Invalid Type — content must be object');
        if (content._id === undefined) this._id = uid();
        for (const key in content) {
            this[key] = content[key];
        }
    }
    hasKeys(keys) {
        must(isObject(keys) || keys === undefined, 'Invalid Type — provided keys must be a non-array object or undefined');
        const qb = new QueryBuilder(keys);
        return qb.matches(this);
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

export default Document;