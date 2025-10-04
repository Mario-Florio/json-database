import DocReader from '../../core/entities/DocReader.js';
import Document from '../../core/entities/Document.js';
import logEventEmitter from '../../infrastructure/logging/logEventEmitter.js';
import DB from '../../infrastructure/IO-API/DB.js';
import { uphold } from '../../shared/contracts/contracts.js';

class DocumentRepository {
    #db;

    constructor(collectionName) {
        this.#db = new DB(collectionName);
    }
    async instantiate(operationObj) {
        logEventEmitter.emit(logEventEmitter.events.REPO, operationObj);

        const result = await this.#db.instantiate();
        logEventEmitter.emit(logEventEmitter.events.DB_HITS, operationObj);

        return result;
    }
    async create(operationObj) {
        logEventEmitter.emit(logEventEmitter.events.REPO, operationObj);

        const { document } = operationObj.payload;
        uphold(
            document instanceof Document,
            'DocumentRepositoryUseCases must only input Document instances',
        );

        const result = await this.#db.create(document);
        logEventEmitter.emit(logEventEmitter.events.DB_HITS, operationObj);

        return result;
    }
    async read(operationObj) {
        logEventEmitter.emit(logEventEmitter.events.REPO, operationObj);

        const result = await this.#db.read();
        logEventEmitter.emit(logEventEmitter.events.DB_HITS, operationObj);

        if (result.success === false) return result;

        const reader = new DocReader(result.gen, (obj) => new Document(obj));
        return result.setGen(reader.read());
    }
    async update(operationObj) {
        logEventEmitter.emit(logEventEmitter.events.REPO, operationObj);

        const { _id, updatedDoc } = operationObj.payload;
        uphold(
            updatedDoc instanceof Document,
            'DocumentRepositoryUseCases must only input Document instances',
        );

        const result = await this.#db.update(_id, updatedDoc);
        logEventEmitter.emit(logEventEmitter.events.DB_HITS, operationObj);

        return result;
    }
    async delete(operationObj) {
        logEventEmitter.emit(logEventEmitter.events.REPO, operationObj);

        const { _id } = operationObj.payload;

        const result = await this.#db.delete(_id);
        logEventEmitter.emit(logEventEmitter.events.DB_HITS, operationObj);

        return result;
    }
}

export default DocumentRepository;
