
function implementsInterface(obj, interfaceObj) {
    for (const method in interfaceObj) {
        if (!(method in obj) || typeof obj[method] !== "function") {
            return false;
        }
    }
    return true;
}

module.exports = implementsInterface;