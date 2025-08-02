const implementsInterface = require('./implementsInterface.js');
const IDocumentRepository = require('../../ports/IDocumentRepository.js');

class DocumentRepoUseCase {
    #repo;

    constructor(documentRepository) {
        if (!implementsInterface(documentRepository, IDocumentRepository)) throw new Error('Invalid Interface implementation');
        this.#repo = documentRepository;
    }
    get repo () {
        return this.#repo
    }
}

module.exports = DocumentRepoUseCase;