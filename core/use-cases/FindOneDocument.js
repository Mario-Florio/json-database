import DocumentRepositoryUseCase from './UseCase.js';
import Document from '../entities/Document.js';
import {
    must, uphold,
    isObject
} from './imports.js';

class FindOneDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        must(isObject(paramObj), 'Invalid Type — paramObj must be a non-array object');
        must(isObject(paramObj.keys), 'Invalid Type — paramObj.keys must be a non-array object');
        
        const { keys } = paramObj;

        const response = this.repo.read();

        if (response.success) {
            const { data } = response;
            uphold(data.every(document => document instanceof Document),
                'Invalid Type — DocumentRepository must only return Document instances');

            const document = data.find(document => document.hasKeys(keys));
            response.data = document ?? null;
        }

        return response;
    }
}

export default FindOneDocument;