
function idIsValid(_id) {
    if (!_id) return false;
    if (typeof _id !== 'string') return false;
    return true;
}

function keysAreValid(keys) {
    if (keys === undefined) return false;
    if (typeof keys !== 'object' || Array.isArray(keys)) return false;
    return true;
}

function setVirtuals(virtuals, obj) {
    for (const virtual of virtuals) {
        Object.defineProperty(obj, virtual.name, {
            get: virtual.getFn, 
            set: virtual.setFn,
            configurable: true
        });
    }
}

export {
    idIsValid,
    keysAreValid,
    setVirtuals
};