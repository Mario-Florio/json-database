import Schema from '../../../core/entities/Schema.js';
import isObject from '../../../shared/__utils__/isObject.js';

const strategyMap = {
    collectionId: (val) => typeof val === 'string',
    _id: (val) => typeof val === 'string',
    schema: (val) => val instanceof Schema,
    data: (val) => isObject(val),
    keys: (val) => isObject(val),
    updatedKeys: (val) => isObject(val)
}

function inputIsValid(paramObj) {
    const isValid = [];

    for (const [key, val] of Object.entries(paramObj)) {

        if (Object.keys(strategyMap).includes(key))
            isValid.push(strategyMap[key](val));
    }

    return isValid.every(check => check === true);
}

export default inputIsValid;