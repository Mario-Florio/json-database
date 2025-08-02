const DocumentRepositoryUseCase = require('./__utils__/UseCase.js');

class FindDocuments extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const documents = this.repo.read();
        return documents ?? null;
    }
}

module.exports = FindDocuments;