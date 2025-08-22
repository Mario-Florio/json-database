import DocumentRepository from '../repositories/DocumentRepository.js';
import InstantiateCollection from '../../core/use-cases/InstantiateCollection.js';
import FindOneDocument from '../../core/use-cases/FindOneDocument.js';
import FindDocuments from '../../core/use-cases/FindDocuments.js';
import SaveDocument from '../../core/use-cases/SaveDocument.js';
import UpdateDocument from '../../core/use-cases/UpdateDocument.js';
import DeleteDocument from '../../core/use-cases/DeleteDocument.js';
import Result from '../../core/entities/Result.js';
import ContractError from '../../shared/contracts/__utils__/ContractError.js';
import inputIsValid from './__utils__/inputIsValid.js';
import { INPUT_IS_INVALID } from './response-tokens.js';

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

        const response = useCase.execute({ keys });
        return response;
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

        const response = useCase.execute({ keys });
        return response;
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

export default {
    instantiateCollection,
    createDocument,
    getDocuments,
    getOneDocument,
    updateDocument,
    deleteDocument
}