import DocumentRepositoryUseCase from './UseCase.js';
import Document from '../entities/Document.js';
import QueryBuilder from '../entities/QueryBuilder.js';
import Operation from '../entities/Operation.js';
import { must, uphold, isObject } from './imports.js';

class FindDocuments extends DocumentRepositoryUseCase {
    constructor(repo, logTaskDispatcher) {
        super(repo, logTaskDispatcher);
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
            'Invalid Type — operatoinObj.payload.keys must be a non-array object',
        );

        const { CORE } = this.logTaskDispatcher.logTasks;
        this.logTaskDispatcher.dispatch(CORE, operationObj);

        const response = await this.repo.read();
        const documents = [];

        if (response.success === false)
            return response.removeGen().setData(documents);

        const { keys } = operationObj.payload;
        const qb = new QueryBuilder(keys);

        for await (const document of response.gen) {
            uphold(
                document instanceof Document,
                'Invalid Type — DocumentRepository must only return Document instances',
            );

            qb.matches(document) && documents.push(document);
        }

        return response.removeGen().setData(documents);
    }
}

export default FindDocuments;
