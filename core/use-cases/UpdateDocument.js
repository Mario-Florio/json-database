const Document = require('../entities/Document.js');
const Schema = require('../entities/Schema.js');
const DocumentRepositoryUseCase = require('./UseCase.js');
const {
    must, uphold,
    isObject
} = require('./imports.js');

const DOC_IS_INVALID = 'Document is invalid representation of schema';

class UpdateDocument extends DocumentRepositoryUseCase {
    constructor(repo) {
        super(repo);
    }

    execute(paramObj) {
        must(isObject(paramObj), 'Invalid Type — paramObj must be a non-array object');
        must(typeof paramObj._id === 'string', 'Invalid Type — paramObj._id must be a non-array object');
        must(isObject(paramObj.data), 'Invalid Type — paramObj.data must be a non-array object');
        must(isObject(paramObj.updatedKeys), 'Invalid Type — paramObj.updatedKeys must be a non-array object');

        const { schema, _id, data, updatedKeys } = paramObj;
        uphold(schema instanceof Schema, 'Invalid Type — schema must always be an instance of Schema');

        const updatedDoc = new Document(data).mergeKeys(updatedKeys);
        const isValid = schema.validateDoc(updatedDoc);

        if (!isValid) return { message: DOC_IS_INVALID, success: false }

        const response = this.repo.update(_id, updatedDoc);
        return response;
    }
}

module.exports = UpdateDocument;