import { isObject } from '../imports.js';
import typeCheckMap from './typeCheckMap.js';

const rules = {
    type: {
        required: true,
        valid: Object.keys(typeCheckMap),
    },
    required: {
        required: false,
        valid: [true, false],
    }
};

function validateKeyMetaData(keyMetaData) {
    validateShape(keyMetaData);
    for (const [key, metaData] of Object.entries(keyMetaData)) {
        validateMetaData(metaData);
        validateRequired(key, metaData);
    }
}

// UTILS
function validateShape(keyMetaData) {
    if (!isObject(keyMetaData)) throw new TypeError('keyMetaData must be a non-array object');
    for (const [key, metaData] of Object.entries(keyMetaData)) {
        if (!isObject(metaData)) throw new TypeError(`keyMetaData.${key} must be a non-array object`);
    }
}

function validateMetaData(metaData) {
    for (const [key, val] of Object.entries(metaData)) {
        if (!rules[key])
            throw new Error(`${key} is not a valid prop`);

        if (!rules[key].valid.includes(val))
            throw new TypeError(`${val} is not a valid ${key}`);
    }
}

function validateRequired(key, metaData) {
    for (const [k, rule] of Object.entries(rules)) {
        if (rule.required && !(k in metaData))
            throw new Error(`Missing required prop ${k} in field ${key}`);
    }
}

export default validateKeyMetaData;