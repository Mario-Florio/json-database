import DocumentRepositoryUseCase from './UseCase.js';

class DeleteDocument extends DocumentRepositoryUseCase {
    constructor(repo, logEvents) {
        super(repo, logEvents);
    }
    async execute(operationObj) {
        const { _id } = operationObj.payload;

        const response = await this.repo.delete(_id);
        return response;
    }
}

export default DeleteDocument;
