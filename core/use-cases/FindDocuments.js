import DocumentRepositoryUseCase from './UseCase.js';
import Document from '../entities/Document.js';
import {
    must, uphold,
    isObject
} from './imports.js';

class FindDocuments extends DocumentRepositoryUseCase {
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
        const filtered = documents.filter(document => document.hasKeys(keys));

        return filtered;
    }
}

export default FindDocuments;