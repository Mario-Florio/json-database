const Document = require('../entities/Document.js');
const Schema = require('../entities/Schema.js');
const DocumentRepositoryUseCase = require('./UseCase.js');
const {
    must, uphold,
    isObject
} = require('./imports.js');

const DOC_IS_INVALID = 'Document is invalid representation of schema';

class SaveDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        must(isObject(paramObj), 'Invalid Type — paramObj must be a non-array object');
        must(isObject(paramObj.data), 'Invalid Type — paramObj.data must be a non-array object');

        const { schema, data } = paramObj;
        uphold(schema instanceof Schema, 'Invalid Type — schema must always be an instance of Schema');

        const document = new Document(data);
        const isValid = schema.validateDoc(document);

        if (!isValid) return { message: DOC_IS_INVALID, success: false };
        
        const response = this.repo.create(document);
        return response;
    }
}

module.exports = SaveDocument;