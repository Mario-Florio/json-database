import DocumentRepositoryUseCase from './UseCase.js';

class DeleteDocument extends DocumentRepositoryUseCase {
    constructor(repo, logEvents) {
        super(repo, logEvents);
    }
    async execute(operationObj) {
        this.logEvents.emit(this.logEvents.events.CORE, operationObj);

        const response = await this.repo.delete(operationObj);
        return response;
    }
}

export default DeleteDocument;
