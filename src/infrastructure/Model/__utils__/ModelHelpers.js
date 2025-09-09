
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

export {
    idIsValid,
    keysAreValid
};