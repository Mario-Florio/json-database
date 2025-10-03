import Operation from '../../core/entities/Operation.js';
import EventEmitter from 'node:events';
import Logger from '../Logger/Logger.js';
import config from '../../config.js';

const runningOps = new Map();

class LogEventEmitter extends EventEmitter {
    events = {
        ATTEMPT: 'ATTEMPT',
        SUCCESS: 'SUCCESS',
        FAILED: 'FAILED',
    };

    emit(event, ...args) {
        if (config.ENV === 'test') return false;
        return super.emit(event, ...args);
    }
}

const logEventEmitter = new LogEventEmitter().setMaxListeners(20);

logEventEmitter.on(logEventEmitter.events.ATTEMPT, (operation) => {
    runningOps.set(operation.id, operation);
    Logger.info(getLogAttemptMsg(operation), {
        operationId: operation.id,
        operationType: operation.type,
        collectionId: operation.payload.collectionId,
    });
});

logEventEmitter.on(logEventEmitter.events.SUCCESS, (operation) => {
    if (runningOps.has(operation.id)) runningOps.delete(operation.id);
    Logger.info(getLogSuccessMsg(operation), {
        operationId: operation.id,
        operationType: operation.type,
        collectionId: operation.payload.collectionId,
    });
});

logEventEmitter.on(logEventEmitter.events.FAILED, (operation) => {
    if (runningOps.has(operation.id)) runningOps.delete(operation.id);
    Logger.warn(getLogFailedMsg(operation), {
        operationId: operation.id,
        operationType: operation.type,
        collectionId: operation.payload.collectionId,
    });
});

// UTILS
function getLogAttemptMsg(operation) {
    switch (operation.type) {
        case Operation.TYPES.CREATE_DOCUMENT:
            return 'Query Attempt: Creating document';
        case Operation.TYPES.GET_ONE_DOCUMENT:
            return 'Query Attempt: Finding document';
        case Operation.TYPES.GET_DOCUMENTS:
            return 'Query Attempt: Finding documents';
        case Operation.TYPES.UPDATE_DOCUMENT:
            return 'Update Attempt: Updating document';
        case Operation.TYPES.DELETE_DOCUMENT:
            return 'Delete Attempt: Deleting document';
        default:
            return 'Unknown Attempt';
    }
}

function getLogSuccessMsg(operation) {
    switch (operation.type) {
        case Operation.TYPES.CREATE_DOCUMENT:
            return 'Create Successful: Document created';
        case Operation.TYPES.GET_ONE_DOCUMENT:
            return 'Query Successful: Found one document';
        case Operation.TYPES.GET_DOCUMENTS:
            return 'Query Successful: Found documents';
        case Operation.TYPES.UPDATE_DOCUMENT:
            return 'Update Successful: Document updated';
        case Operation.TYPES.DELETE_DOCUMENT:
            return 'Delete Successful: Document deleted';
        default:
            return 'Unknown Success';
    }
}

function getLogFailedMsg(operation) {
    switch (operation.type) {
        case Operation.TYPES.CREATE_DOCUMENT:
            return 'Create Failed: Document not created';
        case Operation.TYPES.GET_ONE_DOCUMENT:
            return 'Query Failed: No document found';
        case Operation.TYPES.GET_DOCUMENTS:
            return 'Query Failed: No documents found';
        case Operation.TYPES.UPDATE_DOCUMENT:
            return 'Update Failed: Document not updated';
        case Operation.TYPES.DELETE_DOCUMENT:
            return 'Delete Failed: Document not deleted';
        default:
            return 'Unknown Failure';
    }
}

export default logEventEmitter;
