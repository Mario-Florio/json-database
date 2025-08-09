const isObject = require('./isObject.js');
const typeCheckMap = require('./typeCheckMap.js');

const TYPE = 'type';
const REQUIRED = 'required';
const validProps = [TYPE, REQUIRED];
const requiredProps = [TYPE];
const validPropVals = {
    [TYPE]: [...Object.keys(typeCheckMap)],
    [REQUIRED]: [false, true]
};

function validateKeyMetaData(keyMetaData) {
    if (!isObject(keyMetaData)) throw new TypeError('keyMetaData must be a non-array object');
    for (const field of Object.keys(keyMetaData)) {
        if (!isObject(keyMetaData[field])) throw new TypeError(`keyMetaData.${field} must be a non-array object`);
        for (const prop of Object.keys(keyMetaData[field])) {
            if (!validProps.includes(prop)) throw new Error(`${prop} is not a valid prop`);
            if (!validPropVals[prop].includes(keyMetaData[field][prop])) throw new TypeError(`${keyMetaData[field][prop]} is not a valid ${prop}`);
        }
        for (const prop of requiredProps) {
            if (!Object.keys(keyMetaData[field]).includes(prop)) throw new Error(`Missing required prop ${prop} in field ${field}`);
        }
    }
}

module.exports = validateKeyMetaData;