import DocumentRepositoryUseCase from './UseCase.js';

class InstantiateCollection extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    async execute() {
        const response = await this.repo.instantiate();
        return response;
    }
}

export default InstantiateCollection;