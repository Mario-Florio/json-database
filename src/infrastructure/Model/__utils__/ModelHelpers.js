function collectionNameIsValid(collectionName) {
    const MAX_LENGTH = 100;
    const MIN_LENGTH = 1;
    if (!collectionName) return false;
    if (typeof collectionName !== 'string') return false;
    if (collectionName.length > MAX_LENGTH) return false;
    if (collectionName.length < MIN_LENGTH) return false;
    return true;
}

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

export { collectionNameIsValid, idIsValid, keysAreValid };
