const DocumentRepository = require('../repositories/DocumentRepository.js');
const InstantiateCollection = require('../../core/use-cases/InstantiateCollection.js');
const FindOneDocument = require('../../core/use-cases/FindOneDocument.js');
const FindDocuments = require('../../core/use-cases/FindDocuments.js');
const SaveDocument = require('../../core/use-cases/SaveDocument.js');
const UpdateDocument = require('../../core/use-cases/UpdateDocument.js');
const DeleteDocument = require('../../core/use-cases/DeleteDocument.js');

function instantiateCollection(paramObj) {
    try {
        const repo = new DocumentRepository(paramObj.collectionId);
        const useCase = new InstantiateCollection(repo);

        const response = useCase.execute();
        return response;
    } catch (err) {
        return errorHandler(err);
    }
}

function createDocument(paramObj) {
    try {
        const repo = new DocumentRepository(paramObj.collectionId);
        const useCase = new SaveDocument(repo);

        const { data, schema } = paramObj;

        const response = useCase.execute({ data, schema });
        return response;
    } catch (err) {
        return errorHandler(err);
    }
}

function getDocuments(paramObj) {
    try {
        const repo = new DocumentRepository(paramObj.collectionId);
        const useCase = new FindDocuments(repo);

        const { keys } = paramObj;

        const doc = useCase.execute({ keys });
        return doc;
    } catch (err) {
        return errorHandler(err);
    }
}

function getOneDocument(paramObj) {
    try {
        const repo = new DocumentRepository(paramObj.collectionId);
        const useCase = new FindOneDocument(repo);

        const { keys } = paramObj;

        const doc = useCase.execute({ keys });
        return doc;
    } catch (err) {
        return errorHandler(err);
    }
}

function updateDocument(paramObj) {
    try {
        const repo = new DocumentRepository(paramObj.collectionId);
        const useCase = new UpdateDocument(repo);

        const { _id, schema, document, updatedKeys } = paramObj;

        const response = useCase.execute({
            _id,
            schema,
            document,
            updatedData: updatedKeys
        });

        return response;
    } catch (err) {
        return errorHandler(err);
    }
}

function deleteDocument(paramObj) {
    try {
        const repo = new DocumentRepository(paramObj.collectionId);
        const useCase = new DeleteDocument(repo);

        const { _id } = paramObj;

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