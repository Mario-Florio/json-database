const DocumentRepository = require('../repositories/DocumentRepository.js');
const InstantiateCollection = require('../../core/use-cases/InstantiateCollection.js');
const FindOneDocument = require('../../core/use-cases/FindOneDocument.js');
const FindDocuments = require('../../core/use-cases/FindDocuments.js');
const SaveDocument = require('../../core/use-cases/SaveDocument.js');
const UpdateDocument = require('../../core/use-cases/UpdateDocument.js');
const DeleteDocument = require('../../core/use-cases/DeleteDocument.js');
const Result = require('../../core/entities/Result.js');
const ContractError = require('../../shared/contracts/__utils__/ContractError.js');
const inputIsValid = require('./__utils__/inputIsValid.js');

const INPUT_IS_INVALID = 'Input is invalid';

function instantiateCollection(paramObj) {
    try {
        if (!inputIsValid(paramObj)) return new Result({ message: INPUT_IS_INVALID, success: false });

        const { collectionId } = paramObj;

        const repo = new DocumentRepository(collectionId);
        const useCase = new InstantiateCollection(repo);

        const response = useCase.execute();
        return response;
    } catch (err) {
        return errorHandler(err);
    }
}

function createDocument(paramObj) {
    try {
        if (!inputIsValid(paramObj)) return new Result({ message: INPUT_IS_INVALID, success: false });

        const { collectionId, data, schema } = paramObj;

        const repo = new DocumentRepository(collectionId);
        const useCase = new SaveDocument(repo);

        const response = useCase.execute({ data, schema });
        return response;
    } catch (err) {
        return errorHandler(err);
    }
}

function getDocuments(paramObj) {
    try {
        if (!inputIsValid(paramObj)) return new Result({ message: INPUT_IS_INVALID, success: false });

        const { collectionId, keys } = paramObj;

        const repo = new DocumentRepository(collectionId);
        const useCase = new FindDocuments(repo);

        const documents = useCase.execute({ keys });

        return new Result({ message: 'Documents can be found in this.data', success: true })
                    .addData(documents);
    } catch (err) {
        return errorHandler(err);
    }
}

function getOneDocument(paramObj) {
    try {
        if (!inputIsValid(paramObj)) return new Result({ message: INPUT_IS_INVALID, success: false });

        const { collectionId, keys } = paramObj;

        const repo = new DocumentRepository(collectionId);
        const useCase = new FindOneDocument(repo);

        const document = useCase.execute({ keys });
        return new Result({ message: 'Document can be found in this.data', success: true })
                    .addData(document);
    } catch (err) {
        return errorHandler(err);
    }
}

function updateDocument(paramObj) {
    try {
        if (!inputIsValid(paramObj)) return new Result({ message: INPUT_IS_INVALID, success: false });

        const { collectionId, _id, schema, data, updatedKeys } = paramObj;

        const repo = new DocumentRepository(collectionId);
        const useCase = new UpdateDocument(repo);

        const response = useCase.execute({
            _id,
            schema,
            data,
            updatedKeys
        });

        return response;
    } catch (err) {
        return errorHandler(err);
    }
}

function deleteDocument(paramObj) {
    try {
        if (!inputIsValid(paramObj)) return new Result({ message: INPUT_IS_INVALID, success: false });

        const { collectionId, _id } = paramObj;

        const repo = new DocumentRepository(collectionId);
        const useCase = new DeleteDocument(repo);

        const response = useCase.execute({ _id });
        return response;
    } catch (err) {
        return errorHandler(err);
    }
}

// UTILS

function errorHandler(err) {
    if (err instanceof ContractError) throw new ContractError(err.message);
    console.log(err);
    return new Result({ message: err.message, success: false });
}

module.exports = {
    instantiateCollection,
    createDocument,
    getDocuments,
    getOneDocument,
    updateDocument,
    deleteDocument
}