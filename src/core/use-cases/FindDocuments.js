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

    async execute(paramObj) {
        must(isObject(paramObj), 'Invalid Type — paramObj must be a non-array object');
        must(isObject(paramObj.keys), 'Invalid Type — paramObj.keys must be a non-array object');
        
        const { keys } = paramObj;

        const response = await this.repo.read();

        if (response.success) {
            const { data } = response;
            uphold(data.every(document => document instanceof Document),
                'Invalid Type — DocumentRepository must only return Document instances');
            
            const filtered = data.filter(document => document.hasKeys(keys));
            response.data = filtered;
        }

        return response;
    }
}

export default FindDocuments;