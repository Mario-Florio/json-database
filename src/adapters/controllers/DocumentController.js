import DocumentRepository from '../repositories/DocumentRepository.js';
import InstantiateCollection from '../../core/use-cases/InstantiateCollection.js';
import FindOneDocument from '../../core/use-cases/FindOneDocument.js';
import FindDocuments from '../../core/use-cases/FindDocuments.js';
import SaveDocument from '../../core/use-cases/SaveDocument.js';
import UpdateDocument from '../../core/use-cases/UpdateDocument.js';
import DeleteDocument from '../../core/use-cases/DeleteDocument.js';
import Operation from '../../core/entities/Operation.js';
import Result from '../../core/entities/Result.js';
import LogTaskDispatcher from '../services/logging/LogTaskDispatcher.js';
import ContractError from '../../shared/contracts/__utils__/ContractError.js';
import inputIsValid from './__utils__/inputIsValid.js';
import { INPUT_IS_INVALID } from './response-tokens.js';
import { must } from '../../shared/contracts/contracts.js';

async function instantiateCollection(operationObj) {
    try {
        must(
            operationObj instanceof Operation,
            'Invalid Type – operationObj must be an Operation',
        );
        must(
            operationObj.type === Operation.types.INSTANTIATE_COLLECTION,
            `Invalid Operation Type – ${operationObj.type} is not INSTANTIATE_COLLECTION`,
        );

        const logTaskDispatcher = new LogTaskDispatcher();
        logTaskDispatcher.dispatch(
            LogTaskDispatcher.logTasks.ATTEMPT,
            operationObj,
        );

        if (!inputIsValid(operationObj.payload))
            return new Result({ message: INPUT_IS_INVALID, success: false });

        const repo = new DocumentRepository(operationObj.collectionId);
        const useCase = new InstantiateCollection(repo, LogTaskDispatcher);

        const response = await useCase.execute(operationObj.payload);
        if (response.success) {
            logTaskDispatcher.dispatch(
                LogTaskDispatcher.logTasks.SUCCESS,
                operationObj,
            );
        } else {
            logTaskDispatcher.dispatch(
                LogTaskDispatcher.logTasks.FAILURE,
                operationObj,
            );
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
            'Invalid Type – operationObj must be an Operation',
        );
        must(
            operationObj.type === Operation.types.CREATE_DOCUMENT,
            `Invalid Operation Type – ${operationObj.type} is not CREATE_DOCUMENT`,
        );

        const logTaskDispatcher = new LogTaskDispatcher();
        logTaskDispatcher.dispatch(
            LogTaskDispatcher.logTasks.ATTEMPT,
            operationObj,
        );

        if (!inputIsValid(operationObj.payload))
            return new Result({ message: INPUT_IS_INVALID, success: false });

        const repo = new DocumentRepository(operationObj.collectionId);
        const useCase = new SaveDocument(repo, LogTaskDispatcher);

        const response = await useCase.execute(operationObj.payload);
        if (response.success) {
            logTaskDispatcher.dispatch(
                LogTaskDispatcher.logTasks.SUCCESS,
                operationObj,
            );
        } else {
            logTaskDispatcher.dispatch(
                LogTaskDispatcher.logTasks.FAILURE,
                operationObj,
            );
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
            'Invalid Type – operationObj must be an Operation',
        );
        must(
            operationObj.type === Operation.types.GET_DOCUMENTS,
            `Invalid Operation Type – ${operationObj.type} is not GET_DOCUMENTS`,
        );

        const logTaskDispatcher = new LogTaskDispatcher();
        logTaskDispatcher.dispatch(
            LogTaskDispatcher.logTasks.ATTEMPT,
            operationObj,
        );

        if (!inputIsValid(operationObj.payload))
            return new Result({ message: INPUT_IS_INVALID, success: false });

        const repo = new DocumentRepository(operationObj.collectionId);
        const useCase = new FindDocuments(repo, LogTaskDispatcher);

        const response = await useCase.execute(operationObj.payload);
        if (response.success) {
            logTaskDispatcher.dispatch(
                LogTaskDispatcher.logTasks.SUCCESS,
                operationObj,
            );
        } else {
            logTaskDispatcher.dispatch(
                LogTaskDispatcher.logTasks.FAILURE,
                operationObj,
            );
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
            'Invalid Type – operationObj must be an Operation',
        );
        must(
            operationObj.type === Operation.types.GET_ONE_DOCUMENT,
            `Invalid Operation Type – ${operationObj.type} is not GET_ONE_DOCUMENT`,
        );

        const logTaskDispatcher = new LogTaskDispatcher();
        logTaskDispatcher.dispatch(
            LogTaskDispatcher.logTasks.ATTEMPT,
            operationObj,
        );

        if (!inputIsValid(operationObj.payload))
            return new Result({ message: INPUT_IS_INVALID, success: false });

        const repo = new DocumentRepository(operationObj.collectionId);
        const useCase = new FindOneDocument(repo, LogTaskDispatcher);

        const response = await useCase.execute(operationObj.payload);
        if (response.success) {
            logTaskDispatcher.dispatch(
                LogTaskDispatcher.logTasks.SUCCESS,
                operationObj,
            );
        } else {
            logTaskDispatcher.dispatch(
                LogTaskDispatcher.logTasks.FAILURE,
                operationObj,
            );
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
            'Invalid Type – operationObj must be an Operation',
        );
        must(
            operationObj.type === Operation.types.UPDATE_DOCUMENT,
            `Invalid Operation Type – ${operationObj.type} is not UPDATE_DOCUMENT`,
        );

        const logTaskDispatcher = new LogTaskDispatcher();
        logTaskDispatcher.dispatch(
            LogTaskDispatcher.logTasks.ATTEMPT,
            operationObj,
        );

        if (!inputIsValid(operationObj.payload))
            return new Result({ message: INPUT_IS_INVALID, success: false });

        const repo = new DocumentRepository(operationObj.collectionId);
        const useCase = new UpdateDocument(repo, LogTaskDispatcher);

        const response = await useCase.execute(operationObj.payload);

        if (response.success) {
            logTaskDispatcher.dispatch(
                LogTaskDispatcher.logTasks.SUCCESS,
                operationObj,
            );
        } else {
            logTaskDispatcher.dispatch(
                LogTaskDispatcher.logTasks.FAILURE,
                operationObj,
            );
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
            'Invalid Type – operationObj must be an Operation',
        );
        must(
            operationObj.type === Operation.types.DELETE_DOCUMENT,
            `Invalid Operation Type – ${operationObj.type} is not DELETE_DOCUMENT`,
        );

        const logTaskDispatcher = new LogTaskDispatcher();
        logTaskDispatcher.dispatch(
            LogTaskDispatcher.logTasks.ATTEMPT,
            operationObj,
        );

        if (!inputIsValid(operationObj.payload))
            return new Result({ message: INPUT_IS_INVALID, success: false });

        const repo = new DocumentRepository(operationObj.collectionId);
        const useCase = new DeleteDocument(repo, LogTaskDispatcher);

        const response = await useCase.execute(operationObj.payload);
        if (response.success) {
            logTaskDispatcher.dispatch(
                LogTaskDispatcher.logTasks.SUCCESS,
                operationObj,
            );
        } else {
            logTaskDispatcher.dispatch(
                LogTaskDispatcher.logTasks.FAILURE,
                operationObj,
            );
        }

        return response;
    } catch (err) {
        return errorHandler(err, operationObj);
    }
}

// UTILS

function errorHandler(err, operationObj) {
    if (err instanceof ContractError) throw new ContractError(err.message);
    const logTaskDispatcher = new LogTaskDispatcher();
    logTaskDispatcher.dispatch(
        LogTaskDispatcher.logTasks.ERROR,
        operationObj,
        err,
    );
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
