import DocumentRepositoryUseCase from './UseCase.js';

class InstantiateCollection extends DocumentRepositoryUseCase {
    constructor(repo, logEvents) {
        super(repo, logEvents);
    }

    async execute(operationObj) {
        this.logEvents.emit(this.logEvents.events.CORE, operationObj);
        
        const response = await this.repo.instantiate();
        return response;
    }
}

export default InstantiateCollection;
