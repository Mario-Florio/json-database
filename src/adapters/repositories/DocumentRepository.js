import Document from '../../core/entities/Document.js';
import DB from '../../infrastructure/IO-API/DB.js';
import { uphold } from '../../shared/contracts/contracts.js';

class DocumentRepository {
    #db;

    constructor(collectionName) {
        this.#db = new DB(collectionName);
    }
    async instantiate() {
        return await this.#db.instantiate();
    }
    async create(document) {
        uphold(document instanceof Document, 'DocumentRepositoryUseCases must only input Document instances');
        return await this.#db.create(document);
    }
    async read() {
        const result = await this.#db.read();
        if (result.success === true) result.data = result.data.map(doc => new Document(doc));
        return result;
    }
    async update(_id, updatedDoc) {
        uphold(updatedDoc instanceof Document, 'DocumentRepositoryUseCases must only input Document instances');
        return await this.#db.update(_id, updatedDoc);
    }
    async delete(_id) {
        return await this.#db.delete(_id);
    }
}

export default DocumentRepository;