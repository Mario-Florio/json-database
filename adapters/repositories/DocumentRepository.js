import Document from '../../core/entities/Document.js';
import DB from '../../IO-API/DB.js';
import { uphold } from '../../shared/contracts/contracts.js';

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
        if (result.success === true) result.data = result.data.map(doc => new Document(doc));
        return result;
    }
    update(_id, updatedDoc) {
        uphold(updatedDoc instanceof Document, 'DocumentRepositoryUseCases must only input Document instances');
        return this.#db.update(_id, updatedDoc);
    }
    delete(_id) {
        return this.#db.delete(_id);
    }
}

export default DocumentRepository;