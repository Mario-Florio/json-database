import DocumentRepositoryUseCase from'./UseCase.js';

class DeleteDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }
    async execute(paramObj) {
        const { _id } = paramObj;

        const response = await this.repo.delete(_id);
        return response;
    }
}

export default DeleteDocument;