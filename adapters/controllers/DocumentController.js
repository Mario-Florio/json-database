const DocumentRepository = require('../repositories/DocumentRepository.js');
const InstantiateCollection = require('../../core/use-cases/InstantiateCollection.js');
const FindOneDocument = require('../../core/use-cases/FindOneDocument.js');
const FindDocuments = require('../../core/use-cases/FindDocuments.js');
const SaveDocument = require('../../core/use-cases/SaveDocument.js');
const UpdateDocument = require('../../core/use-cases/UpdateDocument.js');
const DeleteDocument = require('../../core/use-cases/DeleteDocument.js');

function instantiateCollection(paramObj) {
    try {
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
        const { collectionId, keys } = paramObj;

        const repo = new DocumentRepository(collectionId);
        const useCase = new FindDocuments(repo);

        const document = useCase.execute({ keys });
        return document;
    } catch (err) {
        return errorHandler(err);
    }
}

function getOneDocument(paramObj) {
    try {
        const { collectionId, keys } = paramObj;

        const repo = new DocumentRepository(collectionId);
        const useCase = new FindOneDocument(repo);

        const document = useCase.execute({ keys });
        return document;
    } catch (err) {
        return errorHandler(err);
    }
}

function updateDocument(paramObj) {
    try {
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
    if (err.severity && err.isSevere()) throw new Error(err.message);
    return { message: err.message };
}

module.exports = {
    instantiateCollection,
    createDocument,
    getDocuments,
    getOneDocument,
    updateDocument,
    deleteDocument
}