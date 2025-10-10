import DocReader from '../../core/entities/DocReader.js';
import Document from '../../core/entities/Document.js';
import LogTaskDispatcher from '../services/logging/LogTaskDispatcher.js';
import DB from '../../infrastructure/IO-API/DB.js';
import { uphold } from '../../shared/contracts/contracts.js';

const { REPO, DB_HITS } = LogTaskDispatcher.logTasks;

class DocumentRepository {
    #db;

    constructor(collectionName) {
        this.#db = new DB(collectionName);
    }
    async instantiate(operationObj) {
        const logTaskDispatcher = new LogTaskDispatcher();
        logTaskDispatcher.dispatch(REPO, operationObj);

        const result = await this.#db.instantiate();
        logTaskDispatcher.dispatch(DB_HITS, operationObj);

        return result;
    }
    async create(operationObj) {
        const logTaskDispatcher = new LogTaskDispatcher();
        logTaskDispatcher.dispatch(REPO, operationObj);

        const { document } = operationObj.payload;
        uphold(
            document instanceof Document,
            'DocumentRepositoryUseCases must only input Document instances',
        );

        const result = await this.#db.create(document);
        logTaskDispatcher.dispatch(DB_HITS, operationObj);

        return result;
    }
    async read(operationObj) {
        const logTaskDispatcher = new LogTaskDispatcher();
        logTaskDispatcher.dispatch(REPO, operationObj);

        const result = await this.#db.read();
        logTaskDispatcher.dispatch(DB_HITS, operationObj);

        if (result.success === false) return result;

        const reader = new DocReader(result.gen, (obj) => new Document(obj));
        return result.setGen(reader.read());
    }
    async update(operationObj) {
        const logTaskDispatcher = new LogTaskDispatcher();
        logTaskDispatcher.dispatch(REPO, operationObj);

        const { _id, updatedDoc } = operationObj.payload;
        uphold(
            updatedDoc instanceof Document,
            'DocumentRepositoryUseCases must only input Document instances',
        );
        const result = await this.#db.update(_id, updatedDoc);
        logTaskDispatcher.dispatch(DB_HITS, operationObj);

        return result;
    }
    async delete(operationObj) {
        const logTaskDispatcher = new LogTaskDispatcher();
        logTaskDispatcher.dispatch(REPO, operationObj);

        const { _id } = operationObj.payload;
        const result = await this.#db.delete(_id);
        logTaskDispatcher.dispatch(DB_HITS, operationObj);

        return result;
    }
}

export default DocumentRepository;
