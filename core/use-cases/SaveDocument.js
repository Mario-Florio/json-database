const DocumentRepositoryUseCase = require('./__utils__/UseCase.js');

class SaveDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const response = this.repo.create(paramObj.data);
        return response ?? null;
    }
}

module.exports = SaveDocument;