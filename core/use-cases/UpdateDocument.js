const Document = require('../entities/Document.js');
const DocumentRepositoryUseCase = require('./UseCase.js');

const DOC_IS_INVALID = 'Document is invalid representation of schema';

class UpdateDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const { schema, _id, data, updatedKeys } = paramObj;

        const updatedDoc = new Document(data).mergeKeys(updatedKeys);
        const isValid = schema.validateDoc(updatedDoc);

        if (!isValid) return { message: DOC_IS_INVALID, success: false }

        const response = this.repo.update(_id, updatedDoc);
        return response;
    }
}

module.exports = UpdateDocument;