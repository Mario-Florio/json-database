import { must, uid, isObject } from './imports.js';

// Operation object for Controller methods
// Tracks metadata (e.g. type, unique ID) for each operation
// Not to be confused with Query operations in QueryBuilder.js
class Operation {
    static #types = {
        INSTANTIATE_COLLECTION: 'INSTANTIATE_COLLECTION',
        CREATE_DOCUMENT: 'CREATE_DOCUMENT',
        GET_DOCUMENTS: 'GET_DOCUMENTS',
        GET_ONE_DOCUMENT: 'GET_ONE_DOCUMENT',
        UPDATE_DOCUMENT: 'UPDATE_DOCUMENT',
        DELETE_DOCUMENT: 'DELETE_DOCUMENT',
    };

    static get types() {
        return Operation.#types;
    }

    #id;
    #type;
    #collectionId;
    #payload;

    constructor({ type, collectionId, payload }) {
        must(
            Object.values(Operation.types).includes(type),
            `Invalid Type – ${type} is not a valid operation type`,
        );
        must(
            typeof collectionId === 'string',
            'Invalid Type – collectionId must be a string',
        );
        must(isObject(payload), 'Invalid Type – payload must be an object');

        this.#id = uid();
        this.#type = type;
        this.#collectionId = collectionId;
        this.#payload = payload;
    }

    get id() {
        return this.#id;
    }

    get type() {
        return this.#type;
    }

    get collectionId() {
        return this.#collectionId;
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
