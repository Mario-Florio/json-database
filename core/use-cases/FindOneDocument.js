const DocumentRepositoryUseCase = require('./UseCase.js');
const Document = require('../entities/Document.js');
const { uphold } = require('./imports.js');

class FindOneDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const { keys } = paramObj;

        const documents = this.repo.read();
        uphold(documents.every(document => document instanceof Document), 'DocumentRepository must only return Document instances');
        const document = documents.find(document => document.hasKeys(keys));

        return document ?? null;
    }
}

module.exports = FindOneDocument