const DocumentRepositoryUseCase = require('./__utils__/UseCase.js');
const filterCondition = require('./__utils__/filterCondition.js');

class FindDocuments extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const documents = this.repo.read();
        const filtered = documents.filter(doc => filterCondition(doc, paramObj.keys));

        return filtered ?? null;
    }
}

module.exports = FindDocuments;