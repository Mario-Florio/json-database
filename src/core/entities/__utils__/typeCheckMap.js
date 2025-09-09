const typeCheckMap = {
    string: (val) => typeof val === 'string',
    number: (val) => typeof val === 'number' && !Number.isNaN(val),
    boolean: (val) => typeof val === 'boolean',
    null: (val) => val === null,
    object: (val) =>
        val !== null && typeof val === 'object' && !Array.isArray(val),
    array: (val) => Array.isArray(val),
};

export default typeCheckMap;
