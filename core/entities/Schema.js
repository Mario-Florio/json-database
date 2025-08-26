import validateKeyMetaData from './__utils__/validateKeyMetaData.js';
import constKeys from './__utils__/constKeys.js';
import typeCheckMap from './__utils__/typeCheckMap.js';
import Document from './Document.js';
import { guarantee } from './imports.js';

class Schema {
    constructor(keyMetaData) {
        validateKeyMetaData(keyMetaData);
        for (const field of Object.keys(keyMetaData)) {
            this[field] = keyMetaData[field];
        }
        guarantee(
            Object.keys(this).length === Object.keys(keyMetaData).length,
            'Schema must have same amount of keys as keyMetaData'
        );
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
            if (!this.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    }
}

export default Schema;