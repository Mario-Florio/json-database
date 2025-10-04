import DocReader from '../../core/entities/DocReader.js';
import Document from '../../core/entities/Document.js';
import DB from '../../infrastructure/IO-API/DB.js';
import { uphold } from '../../shared/contracts/contracts.js';

class DocumentRepository {
    #db;

    constructor(collectionName) {
        this.#db = new DB(collectionName);
    }
    async instantiate(operationObj) {
        return await this.#db.instantiate();
    }
    async create(operationObj) {
        const { document } = operationObj.payload;
        uphold(
            document instanceof Document,
            'DocumentRepositoryUseCases must only input Document instances',
        );
        return await this.#db.create(document);
    }
    async read(operationObj) {
        const result = await this.#db.read();

        if (result.success === false) return result;

        const reader = new DocReader(result.gen, (obj) => new Document(obj));
        return result.setGen(reader.read());
    }
    async update(operationObj) {
        const { _id, updatedDoc } = operationObj.payload;
        uphold(
            updatedDoc instanceof Document,
            'DocumentRepositoryUseCases must only input Document instances',
        );
        return await this.#db.update(_id, updatedDoc);
    }
    async delete(operationObj) {
        const { _id } = operationObj.payload;
        return await this.#db.delete(_id);
    }
}

export default DocumentRepository;
