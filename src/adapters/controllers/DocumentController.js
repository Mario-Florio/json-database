import DocumentRepository from '../repositories/DocumentRepository.js';
import InstantiateCollection from '../../core/use-cases/InstantiateCollection.js';
import FindOneDocument from '../../core/use-cases/FindOneDocument.js';
import FindDocuments from '../../core/use-cases/FindDocuments.js';
import SaveDocument from '../../core/use-cases/SaveDocument.js';
import UpdateDocument from '../../core/use-cases/UpdateDocument.js';
import DeleteDocument from '../../core/use-cases/DeleteDocument.js';
import Operation from '../../core/entities/Operation.js';
import Result from '../../core/entities/Result.js';
import logEventEmitter from '../events/LogEvents.js';
import ContractError from '../../shared/contracts/__utils__/ContractError.js';
import inputIsValid from './__utils__/inputIsValid.js';
import { INPUT_IS_INVALID } from './response-tokens.js';
import { must } from '../../shared/contracts/contracts.js';

async function instantiateCollection(operationObj) {
    try {
        must(
            operationObj instanceof Operation,
            'Invalid Type – Input must be an Operation',
        );
        must(
            operationObj.type === Operation.TYPES.INSTANTIATE_COLLECTION,
            `Invalid Operation Type – ${operationObj.type} is not INSTANTIATE_COLLECTION`,
        );

        logEventEmitter.emit(logEventEmitter.events.ATTEMPT, operationObj);

        if (!inputIsValid(operationObj.payload))
            return new Result({ message: INPUT_IS_INVALID, success: false });

        const { collectionId } = operationObj.payload;

        const repo = new DocumentRepository(collectionId);
        const useCase = new InstantiateCollection(repo, logEventEmitter);

        const response = await useCase.execute(operationObj);
        if (response.success) {
            logEventEmitter.emit(logEventEmitter.events.SUCCESS, operationObj);
        } else {
            logEventEmitter.emit(logEventEmitter.events.FAILURE, operationObj);
        }

        return response;
    } catch (err) {
        return errorHandler(err, operationObj);
    }
}

async function createDocument(operationObj) {
    try {
        must(
            operationObj instanceof Operation,
            'Invalid Type – Input must be an Operation',
        );
        must(
            operationObj.type === Operation.TYPES.CREATE_DOCUMENT,
            `Invalid Operation Type – ${operationObj.type} is not CREATE_DOCUMENT`,
        );

        logEventEmitter.emit(logEventEmitter.events.ATTEMPT, operationObj);

        if (!inputIsValid(operationObj.payload))
            return new Result({ message: INPUT_IS_INVALID, success: false });

        const { collectionId } = operationObj.payload;

        const repo = new DocumentRepository(collectionId);
        const useCase = new SaveDocument(repo, logEventEmitter);

        const response = await useCase.execute(operationObj);
        if (response.success) {
            logEventEmitter.emit(logEventEmitter.events.SUCCESS, operationObj);
        } else {
            logEventEmitter.emit(logEventEmitter.events.FAILURE, operationObj);
        }

        return response;
    } catch (err) {
        return errorHandler(err, operationObj);
    }
}

async function getDocuments(operationObj) {
    try {
        must(
            operationObj instanceof Operation,
            'Invalid Type – Input must be an Operation',
        );
        must(
            operationObj.type === Operation.TYPES.GET_DOCUMENTS,
            `Invalid Operation Type – ${operationObj.type} is not GET_DOCUMENTS`,
        );

        logEventEmitter.emit(logEventEmitter.events.ATTEMPT, operationObj);

        if (!inputIsValid(operationObj.payload))
            return new Result({ message: INPUT_IS_INVALID, success: false });

        const { collectionId } = operationObj.payload;

        const repo = new DocumentRepository(collectionId);
        const useCase = new FindDocuments(repo, logEventEmitter);

        const response = await useCase.execute(operationObj);
        if (response.success) {
            logEventEmitter.emit(logEventEmitter.events.SUCCESS, operationObj);
        } else {
            logEventEmitter.emit(logEventEmitter.events.FAILURE, operationObj);
        }

        return response;
    } catch (err) {
        return errorHandler(err, operationObj);
    }
}

async function getOneDocument(operationObj) {
    try {
        must(
            operationObj instanceof Operation,
            'Invalid Type – Input must be an Operation',
        );
        must(
            operationObj.type === Operation.TYPES.GET_ONE_DOCUMENT,
            `Invalid Operation Type – ${operationObj.type} is not GET_ONE_DOCUMENT`,
        );

        logEventEmitter.emit(logEventEmitter.events.ATTEMPT, operationObj);

        if (!inputIsValid(operationObj.payload))
            return new Result({ message: INPUT_IS_INVALID, success: false });

        const { collectionId } = operationObj.payload;

        const repo = new DocumentRepository(collectionId);
        const useCase = new FindOneDocument(repo, logEventEmitter);

        const response = await useCase.execute(operationObj);
        if (response.success) {
            logEventEmitter.emit(logEventEmitter.events.SUCCESS, operationObj);
        } else {
            logEventEmitter.emit(logEventEmitter.events.FAILURE, operationObj);
        }

        return response;
    } catch (err) {
        return errorHandler(err, operationObj);
    }
}

async function updateDocument(operationObj) {
    try {
        must(
            operationObj instanceof Operation,
            'Invalid Type – Input must be an Operation',
        );
        must(
            operationObj.type === Operation.TYPES.UPDATE_DOCUMENT,
            `Invalid Operation Type – ${operationObj.type} is not UPDATE_DOCUMENT`,
        );

        logEventEmitter.emit(logEventEmitter.events.ATTEMPT, operationObj);

        if (!inputIsValid(operationObj.payload))
            return new Result({ message: INPUT_IS_INVALID, success: false });

        const { collectionId } = operationObj.payload;

        const repo = new DocumentRepository(collectionId);
        const useCase = new UpdateDocument(repo, logEventEmitter);

        const response = await useCase.execute(operationObj);

        if (response.success) {
            logEventEmitter.emit(logEventEmitter.events.SUCCESS, operationObj);
        } else {
            logEventEmitter.emit(logEventEmitter.events.FAILURE, operationObj);
        }

        return response;
    } catch (err) {
        return errorHandler(err, operationObj);
    }
}

async function deleteDocument(operationObj) {
    try {
        must(
            operationObj instanceof Operation,
            'Invalid Type – Input must be an Operation',
        );
        must(
            operationObj.type === Operation.TYPES.DELETE_DOCUMENT,
            `Invalid Operation Type – ${operationObj.type} is not DELETE_DOCUMENT`,
        );

        logEventEmitter.emit(logEventEmitter.events.ATTEMPT, operationObj);

        if (!inputIsValid(operationObj.payload))
            return new Result({ message: INPUT_IS_INVALID, success: false });

        const { collectionId } = operationObj.payload;

        const repo = new DocumentRepository(collectionId);
        const useCase = new DeleteDocument(repo, logEventEmitter);

        const response = await useCase.execute(operationObj);
        if (response.success) {
            logEventEmitter.emit(logEventEmitter.events.SUCCESS, operationObj);
        } else {
            logEventEmitter.emit(logEventEmitter.events.FAILURE, operationObj);
        }

        return response;
    } catch (err) {
        return errorHandler(err, operationObj);
    }
}

// UTILS

function errorHandler(err, operationObj) {
    if (err instanceof ContractError) throw new ContractError(err.message);
    logEventEmitter.emit(logEventEmitter.events.ERROR, operationObj, err);
    return new Result({ message: err.message, success: false });
}

export default {
    instantiateCollection,
    createDocument,
    getDocuments,
    getOneDocument,
    updateDocument,
    deleteDocument,
};
