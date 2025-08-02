const DocumentRepositoryUseCase = require('./__utils__/UseCase.js');

class InstantiateCollection extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute() {
        const response = this.repo.instantiate();
        return response ?? null;
    }
}

module.exports = InstantiateCollection;