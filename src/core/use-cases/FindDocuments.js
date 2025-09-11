import DocumentRepositoryUseCase from './UseCase.js';
import Document from '../entities/Document.js';
import { must, uphold, QueryBuilder, isObject } from './imports.js';

class FindDocuments extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    async execute(paramObj) {
        must(
            isObject(paramObj),
            'Invalid Type — paramObj must be a non-array object',
        );
        must(
            isObject(paramObj.keys),
            'Invalid Type — paramObj.keys must be a non-array object',
        );

        const { keys } = paramObj;

        const response = await this.repo.read();
        const documents = [];

        if (response.success === true) {
            const qb = new QueryBuilder(keys);

            for (const document of response.gen) {
                uphold(
                    document instanceof Document,
                    'Invalid Type — DocumentRepository must only return Document instances',
                );

                qb.matches(document) && documents.push(document);
            }

            response.removeGen();
        }

        return response.setData(documents);
    }
}

export default FindDocuments;
