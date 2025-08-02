const Document = require('../entities/Document.js');
const DocumentRepositoryUseCase = require('./__utils__/UseCase.js');

class UpdateDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const updatedDoc = Document.mergeUpdate(paramObj.document, paramObj.updatedData);

        const response = this.repo.update(paramObj._id, updatedDoc);
        return response ?? null;
    }
}

module.exports = UpdateDocument;