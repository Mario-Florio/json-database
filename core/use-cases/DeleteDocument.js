const DocumentRepositoryUseCase = require('./__utils__/UseCase.js');

class DeleteDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }
    execute(paramObj) {
        const response = this.repo.delete(paramObj._id);
        return response ?? null;
    }
}

module.exports = DeleteDocument;