const Document = require('../entities/Document.js');
const DocumentRepositoryUseCase = require('./UseCase.js');

const DOC_IS_INVALID = 'Document is invalid representation of schema';

class SaveDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const { schema, data } = paramObj;

        const document = new Document(data);
        const isValid = schema.validateDoc(document);

        if (!isValid) return { message: DOC_IS_INVALID, success: false };
        
        const response = this.repo.create(document);
        return response;
    }
}

module.exports = SaveDocument;