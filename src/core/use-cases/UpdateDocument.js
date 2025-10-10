import Document from '../entities/Document.js';
import Schema from '../entities/Schema.js';
import Operation from '../entities/Operation.js';
import DocumentRepositoryUseCase from './UseCase.js';
import { must, uphold, isObject } from './imports.js';

const DOC_IS_INVALID = 'Document is invalid representation of schema';

class UpdateDocument extends DocumentRepositoryUseCase {
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
            typeof operationObj.payload._id === 'string',
            'Invalid Type — operationObj.payload._id must be a non-array object',
        );
        must(
            isObject(operationObj.payload.data),
            'Invalid Type — operationObj.payload.data must be a non-array object',
        );
        must(
            isObject(operationObj.payload.updatedKeys),
            'Invalid Type — operationObj.payload.updatedKeys must be a non-array object',
        );

        const { CORE } = this.logTaskDispatcher.logTasks;
        this.logTaskDispatcher.dispatch(CORE, operationObj);

        const { schema, _id, data, updatedKeys } = operationObj.payload;
        uphold(
            schema instanceof Schema,
            'Invalid Type — schema must always be an instance of Schema',
        );

        const updatedDoc = new Document(data).mergeKeys(updatedKeys);
        const isValid = schema.validateDoc(updatedDoc);

        if (!isValid) return { message: DOC_IS_INVALID, success: false };

        operationObj.payload = { _id, updatedDoc };
        const response = await this.repo.update(operationObj);
        return response;
    }
}

export default UpdateDocument;
