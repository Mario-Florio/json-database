import DocumentRepositoryUseCase from './UseCase.js';
import Document from '../entities/Document.js';
import QueryBuilder from '../entities/QueryBuilder.js';
import Operation from '../entities/Operation.js';
import { must, uphold, isObject } from './imports.js';

class FindOneDocument extends DocumentRepositoryUseCase {
    constructor(repo, logEvents) {
        super(repo, logEvents);
    }

    async execute(operationObj) {
        must(
            operationObj instanceof Operation,
            'Invalid Type — operationObj must be an instance of Operation',
        );
        must(
            isObject(operationObj.payload),
            'Invalid Type — operationObj.payload must be a non-array object',
        );
        must(
            isObject(operationObj.payload.keys),
            'Invalid Type — operationObj.payload.keys must be a non-array object',
        );

        const { CORE } = this.logTaskDispatcher.logTasks;
        this.logTaskDispatcher.dispatch(CORE, operationObj);

        const response = await this.repo.read();
        let data = null;

        if (response.success === false) return response.setData(data);

        const { keys } = operationObj.payload;
        const qb = new QueryBuilder(keys);

        for await (const document of response.gen) {
            uphold(
                document instanceof Document,
                'Invalid Type — DocumentRepository must only return Document instances',
            );

            if (qb.matches(document)) {
                data = document;
                break;
            }
        }

        return response.setData(data ?? null);
    }
}

export default FindOneDocument;
