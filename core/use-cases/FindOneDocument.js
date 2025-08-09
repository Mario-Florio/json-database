const DocumentRepositoryUseCase = require('./UseCase.js');

class FindOneDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const { keys } = paramObj;

        const documents = this.repo.read();
        const document = documents.find(document => document.hasKeys(keys));

        return document ?? null;
    }
}

module.exports = FindOneDocument