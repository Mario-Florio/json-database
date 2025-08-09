const DocumentRepositoryUseCase = require('./UseCase.js');

class DeleteDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }
    execute(paramObj) {
        const { _id } = paramObj;

        const response = this.repo.delete(_id);
        return response ?? null;
    }
}

module.exports = DeleteDocument;