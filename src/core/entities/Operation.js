import { must, uid, isObject } from './imports.js';

// Operation object for Controller methods
// Tracks metadata (e.g. type, payload, unique ID) for each operation
// Not to be confused with Query operations in QueryBuilder.js
class Operation {
    static #TYPES = {
        INSTANTIATE_COLLECTION: 'INSTANTIATE_COLLECTION',
        CREATE_DOCUMENT: 'CREATE_DOCUMENT',
        GET_DOCUMENTS: 'GET_DOCUMENTS',
        GET_ONE_DOCUMENT: 'GET_ONE_DOCUMENT',
        UPDATE_DOCUMENT: 'UPDATE_DOCUMENT',
        DELETE_DOCUMENT: 'DELETE_DOCUMENT',
    };

    static get TYPES() {
        return Operation.#TYPES;
    }

    #id;
    #type;
    #payload;

    constructor({ type, payload }) {
        must(
            Object.values(Operation.TYPES).includes(type),
            `Invalid Type – ${type} is not a valid operation type`,
        );
        this.#id = uid();
        this.#type = type;
        this.#payload = payload;
    }

    get id() {
        return this.#id;
    }

    get type() {
        return this.#type;
    }

    get payload() {
        return this.#payload;
    }

    set payload(data) {
        must(isObject(data), 'Invalid Type – Payload must be an object');
        this.#payload = data;
    }
}

export default Operation;
