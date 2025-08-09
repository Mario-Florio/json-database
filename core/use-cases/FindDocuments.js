const DocumentRepositoryUseCase = require('./UseCase.js');

class FindDocuments extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const { keys } = paramObj;

        const documents = this.repo.read();
        const filtered = documents.filter(document => document.hasKeys(keys));

        return filtered ?? null;
    }
}

module.exports = FindDocuments;