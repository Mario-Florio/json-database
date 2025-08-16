const Document = require('../entities/Document.js');
const DocumentRepositoryUseCase = require('./UseCase.js');

class UpdateDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const { schema, _id, data, updatedKeys } = paramObj;

        const updatedDoc = new Document(data).mergeKeys(updatedKeys);
        schema.validateDoc(updatedDoc);

        const response = this.repo.update(_id, updatedDoc);
        return response;
    }
}

module.exports = UpdateDocument;