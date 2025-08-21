
const MESSAGE = 'response message';

class DocumentRepositoryDouble {
    #db;

    constructor(collectionName) {
    }
    instantiate() {
        if (Array.isArray(this.#db)) return { message: MESSAGE, success: false };
        this.#db = [];
        return { message: MESSAGE, success: true };
    }
    create(document) {
        if (!Array.isArray(this.#db)) return { message: MESSAGE, success: false };
        this.#db.push(document);
        return { message: MESSAGE, success: true };
    }
    read() {
        if (!Array.isArray(this.#db)) return { message: MESSAGE, success: false };
        return this.#db;
    }
    update(_id, updatedDoc) {
        if (!Array.isArray(this.#db)) return { message: MESSAGE, success: false };
        this.#db = this.#db.map(document => document._id === _id ? updatedDoc : document);
        return { message: MESSAGE, success: true };
    }
    delete(_id) {
        if (!Array.isArray(this.#db)) return { message: MESSAGE, success: false };
        this.#db = this.#db.filter(document => document._id !== _id);
        return { message: MESSAGE, success: true };
    }
}

export default DocumentRepositoryDouble;