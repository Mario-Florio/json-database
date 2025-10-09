function isSubclassOf(sub, sup) {
    if (typeof sub !== 'function' || typeof sup !== 'function') return false;
    let proto = Object.getPrototypeOf(sub);
    while (proto) {
        if (proto === sup) return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}

export default isSubclassOf;
