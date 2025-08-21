import implementsInterface from './__utils__/implementsInterface.js';
import IDocumentRepository from '../ports/IDocumentRepository.js';

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

export default DocumentRepoUseCase;