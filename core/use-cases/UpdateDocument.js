const DocumentRepositoryUseCase = require('./__utils__/UseCase.js');

class UpdateDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const response = this.repo.update(paramObj._id, paramObj.updatedData);
        return response ?? null;
    }
}

module.exports = UpdateDocument;