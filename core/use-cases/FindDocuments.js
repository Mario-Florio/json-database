const DocumentRepositoryUseCase = require('./UseCase.js');
const Document = require('../entities/Document.js');
const { uphold } = require('../../shared/contracts/contracts.js');

class FindDocuments extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const { keys } = paramObj;

        const documents = this.repo.read();
        uphold(documents.every(document => document instanceof Document), 'DocumentRepository must only return Document instances');
        const filtered = documents.filter(document => document.hasKeys(keys));

        return filtered ?? null;
    }
}

module.exports = FindDocuments;