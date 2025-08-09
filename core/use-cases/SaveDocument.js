const Document = require('../entities/Document.js');
const DocumentRepositoryUseCase = require('./UseCase.js');

class SaveDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        const { schema, data } = paramObj;

        const document = new Document(data);
        schema.validateDoc(document);
        
        const response = this.repo.create(document);
        return response ?? null;
    }
}

module.exports = SaveDocument;