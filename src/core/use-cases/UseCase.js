import implementsInterface from './__utils__/implementsInterface.js';
import IDocumentRepository from '../ports/IDocumentRepository.js';
import ILogEvents from '../ports/ILogEvents.js';

class DocumentRepoUseCase {
    #repo;
    #logEvents;

    constructor(documentRepository, logEvents) {
        if (!implementsInterface(documentRepository, IDocumentRepository))
            throw new Error(
                'Invalid Interface implementation — documentRepository is not a valid implementation of IDocumentRepository',
            );

        if (!implementsInterface(logEvents, ILogEvents))
            throw new Error(
                'Invalid Interface implemention — logEvents is not a valid implementation of ILogEvents',
            );

        this.#repo = documentRepository;
        this.#logEvents = logEvents;
    }
    get repo() {
        return this.#repo;
    }
    get logEvents() {
        return this.#logEvents;
    }
}

export default DocumentRepoUseCase;
