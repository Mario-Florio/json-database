import DocumentRepositoryUseCase from './UseCase.js';

class InstantiateCollection extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute() {
        const response = this.repo.instantiate();
        return response;
    }
}

export default InstantiateCollection;