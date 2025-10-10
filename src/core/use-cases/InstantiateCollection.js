import DocumentRepositoryUseCase from './UseCase.js';
import Operation from '../entities/Operation.js';
import { isObject, must } from './imports.js';

class InstantiateCollection extends DocumentRepositoryUseCase {
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

        const { CORE } = this.logTaskDispatcher.logTasks;
        this.logTaskDispatcher.dispatch(CORE, operationObj);

        const response = await this.repo.instantiate();

        return response;
    }
}

export default InstantiateCollection;
