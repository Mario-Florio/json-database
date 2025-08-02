const DocumentRepositoryUseCase = require('./__utils__/UseCase.js');
const filterCondition = require('./__utils__/filterCondition.js');

class FindOneDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const documents = this.repo.read();
        const doc = documents.find(doc => filterCondition(doc, paramObj.keys));

        return doc ?? null;
    }
}

module.exports = FindOneDocument