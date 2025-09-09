import { isObject, deepEqual } from './imports.js';

const operatorRegistry = {
    $eq: (a, b) => deepEqual(a, b),
    $gt: (a, b) => a > b,
    $lt: (a, b) => a < b
}

class QueryBuilder {
    constructor(filter = {}) {
        this.filter = filter;
    }
    matches(doc) {
        return Object.entries(this.filter).every(([key, val]) => {
            if (isOperatorObject(val)) {
                // object → operator(s) check
                return Object.entries(val).every(([op, val]) => applyFilter(op, doc[key], val));
            } else {
                return deepEqual(doc[key], val);
            }
        });
    }
}

// UTILS
function isOperatorObject(val) {
    return isObject(val) && Object.entries(val).every(([k]) => k.startsWith('$'));
}

function applyFilter(op, a, b) {
    const fn = operatorRegistry[op];
    if (!fn) throw new Error(`Unknown operator ${op}`);
    return fn(a, b);
}

export default QueryBuilder;