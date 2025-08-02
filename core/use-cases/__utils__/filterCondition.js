
function filterCondition(doc, keys) {
    for (const key in keys) {
        if (doc[key] !== keys[key]) return false;
    }
    return true;
}

module.exports = filterCondition;