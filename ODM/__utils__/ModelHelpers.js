
function uid() {
    const uid = Date.now().toString(36) +
        Math.random().toString(36).substring(2).padStart(12, 0);
        
    return uid;
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
    instantiateRes
}