
function implementsInterface(instance, InterfaceClass) {
    if (!instance || typeof instance !== 'object') {
        return false;
    }
    if (typeof InterfaceClass !== 'function') {
        return false;
    }

    const instanceProto = Object.getPrototypeOf(instance);
    const interfaceProto = InterfaceClass.prototype;

    // Get all own properties (methods, getters, etc.) from the interface prototype
    const interfaceKeys = Object.getOwnPropertyNames(interfaceProto).filter(key => key !== 'constructor');

    for (const key of interfaceKeys) {
        const interfaceDescriptor = Object.getOwnPropertyDescriptor(interfaceProto, key);
        const instanceDescriptor = Object.getOwnPropertyDescriptor(instanceProto, key);

        // Check if the method exists on the instance's prototype
        if (!instanceDescriptor) {
            return false;
        }

        // If it's a method in the interface, ensure it's a function in the implementation
        if (typeof interfaceDescriptor.value === 'function' && typeof instanceDescriptor.value !== 'function') {
            return false;
        }
    }

    return true;
}

export default implementsInterface;