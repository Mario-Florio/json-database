const DocumentRepositoryUseCase = require('./UseCase.js');
const Document = require('../entities/Document.js');
const {
    must, uphold,
    isObject
} = require('./imports.js');

class FindOneDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        must(isObject(paramObj), 'Invalid Type — paramObj must be a non-array object');
        must(isObject(paramObj.keys), 'Invalid Type — paramObj.keys must be a non-array object');
        
        const { keys } = paramObj;

        const documents = this.repo.read();
        uphold(documents.every(document => document instanceof Document),
               'Invalid Type — DocumentRepository must only return Document instances');
        const document = documents.find(document => document.hasKeys(keys));

        return document ?? null;
    }
}

module.exports = FindOneDocument;