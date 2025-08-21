
function deepEqual(a, b) {
    if (a === b) return true;

    if (typeof a !== 'object' || a === null ||
        typeof b !== 'object' || b === null) {
        return false; // primitives or mismatched types
    }

    if (Array.isArray(a) !== Array.isArray(b)) return false;

    if (Array.isArray(a)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
    }

    // For plain objects
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (const key of aKeys) {
        if (!b.hasOwnProperty(key)) return false;
        if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
}

export default deepEqual;