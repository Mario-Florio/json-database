
function uid() {
    const uid = Date.now().toString(36) +
        Math.random().toString(36).substring(2).padStart(12, 0);
        
    return uid;
}

function mergeKeys(doc, updatedKeys) {
    const constKeys = ['_id', 'createdAt'];

    for (const key in updatedKeys) {
        if (constKeys.includes(key)) continue;
        doc[key] = updatedKeys[key];
    }
    return doc;
}

function filterCondition(doc, keys) {
    for (const key in keys) {
        if (doc[key] !== keys[key]) return false;
    }
    return true;
}

function lateConstructor(model, data) {
    for (const key in data) {
        model[key] = data[key];
    }
    return model;
}

function instantiateRes(response, SubModel) {
    if (Array.isArray(response)) {
        return response.map(obj => lateConstructor(new SubModel(), obj));
    }
    if (response) {
        return lateConstructor(new SubModel(), response);
    }
    return response;
}

module.exports = {
    uid,
    mergeKeys,
    filterCondition,
    instantiateRes
}