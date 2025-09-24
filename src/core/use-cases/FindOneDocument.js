import DocumentRepositoryUseCase from './UseCase.js';
import Document from '../entities/Document.js';
import { must, uphold, QueryBuilder, isObject } from './imports.js';

class FindOneDocument extends DocumentRepositoryUseCase {
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
        let data = null;

        if (response.success === false) return response.setData(data);

        const qb = new QueryBuilder(keys);

        for await (const document of response.gen) {
            uphold(
                document instanceof Document,
                'Invalid Type — DocumentRepository must only return Document instances',
            );

            if (qb.matches(document)) {
                data = document;
                break;
            }
        }

        return response.setData(data ?? null);
    }
}

export default FindOneDocument;
