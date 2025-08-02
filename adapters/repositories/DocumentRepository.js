const DB = require('../../IO-API/DB.js');

class DocumentRepository {
    #db;

    constructor(collectionName) {
        this.#db = new DB(collectionName);
    }
    instantiate() {
        return this.#db.instantiate();
    }
    create(obj) {
        return this.#db.create(obj);
    }
    read() {
        const docs = this.#db.read();
        return docs;
    }
    update(_id, updatedObj) {
        return this.#db.update(_id, updatedObj);
    }
    delete(_id) {
        return this.#db.delete(_id);
    }
}

module.exports = DocumentRepository;