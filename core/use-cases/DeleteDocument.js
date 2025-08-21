import DocumentRepositoryUseCase from'./UseCase.js';

class DeleteDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }
    execute(paramObj) {
        const { _id } = paramObj;

        const response = this.repo.delete(_id);
        return response;
    }
}

export default DeleteDocument;