import Document from '../entities/Document.js';
import Operation from '../entities/Operation.js';
import Schema from '../entities/Schema.js';
import DocumentRepositoryUseCase from './UseCase.js';
import { must, uphold, isObject } from './imports.js';

const DOC_IS_INVALID = 'Document is invalid representation of schema';

class SaveDocument extends DocumentRepositoryUseCase {
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
            isObject(operationObj.payload.data),
            'Invalid Type — operationObj.payload.data must be a non-array object',
        );

        const { CORE } = this.logTaskDispatcher.logTasks;
        this.logTaskDispatcher.dispatch(CORE, operationObj);

        const { schema, data } = operationObj.payload;
        uphold(
            schema instanceof Schema,
            'Invalid Type — schema must always be an instance of Schema',
        );

        const document = new Document(data);
        const isValid = schema.validateDoc(document);

        if (!isValid) return { message: DOC_IS_INVALID, success: false };

        const response = await this.repo.create(document);
        return response;
    }
}

export default SaveDocument;
