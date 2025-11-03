import IDocumentRepository from '../ports/IDocumentRepository.js';
import ILogTaskDispatcher from '../ports/ILogTaskDispatcher.js';
import implementsInterface from './__utils__/implementsInterface.js';

export default class DocumentRepoUseCase {
    #repo;
    #logTaskDispatcher;

    constructor(documentRepository, logTaskDispatcher) {
        if (!implementsInterface(documentRepository, IDocumentRepository))
            throw new Error(
                'Invalid Interface implementation — documentRepository is not a valid implementation of IDocumentRepository',
            );

        if (!implementsInterface(logTaskDispatcher, ILogTaskDispatcher))
            throw new Error(
                'Invalid Interface implemention — logTaskDispatcher is not a valid implementation of ILogTaskDispatcher',
            );

        this.#repo = documentRepository;
        this.#logTaskDispatcher = logTaskDispatcher;
    }
    get repo() {
        return this.#repo;
    }
    get logTaskDispatcher() {
        return this.#logTaskDispatcher;
    }
}
