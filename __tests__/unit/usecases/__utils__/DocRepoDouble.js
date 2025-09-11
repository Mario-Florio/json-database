import { Result } from '../imports';

const MESSAGE = 'response message';

class DocumentRepositoryDouble {
    #db;

    constructor(collectionName) {}
    async instantiate() {
        if (Array.isArray(this.#db))
            return { message: MESSAGE, success: false };
        this.#db = [];
        return { message: MESSAGE, success: true };
    }
    async create(document) {
        if (!Array.isArray(this.#db))
            return { message: MESSAGE, success: false };
        this.#db.push(document);
        return { message: MESSAGE, success: true };
    }
    async read() {
        if (!Array.isArray(this.#db))
            return { message: MESSAGE, success: false };

        return new Result({ message: MESSAGE, success: true }).setGen(
            this.docGen(),
        );
    }
    async update(_id, updatedDoc) {
        if (!Array.isArray(this.#db))
            return { message: MESSAGE, success: false };
        this.#db = this.#db.map((document) =>
            document._id === _id ? updatedDoc : document,
        );
        return { message: MESSAGE, success: true };
    }
    async delete(_id) {
        if (!Array.isArray(this.#db))
            return { message: MESSAGE, success: false };
        this.#db = this.#db.filter((document) => document._id !== _id);
        return { message: MESSAGE, success: true };
    }
    *docGen() {
        for (const doc of this.#db) yield doc;
    }
}

export default DocumentRepositoryDouble;
