const Document = require('../../core/entities/Document.js');
const DB = require('../../IO-API/DB.js');
const { uphold } = require('../../shared/contracts/contracts.js');

class DocumentRepository {
    #db;

    constructor(collectionName) {
        this.#db = new DB(collectionName);
    }
    instantiate() {
        return this.#db.instantiate();
    }
    create(document) {
        uphold(document instanceof Document, 'DocumentRepositoryUseCases must only input Document instances');
        return this.#db.create(document);
    }
    read() {
        const result = this.#db.read();

        if (!result.success) return [];

        return result.data.map(doc => new Document(doc));
    }
    update(_id, updatedDoc) {
        uphold(updatedDoc instanceof Document, 'DocumentRepositoryUseCases must only input Document instances');
        return this.#db.update(_id, updatedDoc);
    }
    delete(_id) {
        return this.#db.delete(_id);
    }
}

module.exports = DocumentRepository;