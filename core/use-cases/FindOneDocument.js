const DocumentRepositoryUseCase = require('./__utils__/UseCase.js');

class FindOneDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const documents = this.repo.read();
        return documents[0] ?? null;
    }
}

module.exports = FindOneDocument