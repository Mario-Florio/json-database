import validateKeyMetaData from './__utils__/validateKeyMetaData.js';
import constKeys from './__utils__/constKeys.js';
import typeCheckMap from './__utils__/typeCheckMap.js';
import Document from './Document.js';
import { guarantee } from './imports.js';

class Schema {
    #virtuals;
    constructor(keyMetaData) {
        validateKeyMetaData(keyMetaData);
        for (const field of Object.keys(keyMetaData)) {
            this[field] = keyMetaData[field];
        }
        this.#virtuals = [];
        guarantee(
            Object.keys(this).length === Object.keys(keyMetaData).length,
            'Schema must have same amount of keys as keyMetaData',
        );
    }
    virtual(name) {
        const v = new Virtual(name);
        this.#virtuals.push(v);
        return v;
    }
    getVirtuals() {
        return this.#virtuals;
    }
    validateDoc(document) {
        if (!(document instanceof Document)) return false;

        // Check all required document fields are present and valid
        for (const key of Object.keys(this)) {
            const { required = false, type } = this[key];
            const value = document[key];

            if (!required && (value === undefined || value === null)) continue;

            if (required && value === undefined) {
                return false;
            }

            if (value !== undefined) {
                if (!typeCheckMap[type]) {
                    return false;
                }
                if (!typeCheckMap[type](value)) {
                    return false;
                }
            }
        }

        // Check that no extraneous fields exist on document
        for (const key of Object.keys(this)) {
            if (constKeys.includes(key)) continue;
            if (!Object.prototype.hasOwnProperty.call(this, key)) {
                return false;
            }
        }

        return true;
    }
}

// UTILS
class Virtual {
    constructor(name) {
        this.name = name;
        this.getFn;
        this.setFn;
    }
    get(fn) {
        this.getFn = fn;
        return this;
    }
    set(fn) {
        this.setFn = fn;
        return this;
    }
}

export default Schema;
