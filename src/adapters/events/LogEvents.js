import Operation from '../../core/entities/Operation.js';
import EventEmitter from 'node:events';
import Logger from '../../infrastructure/Logger/Logger.js';
import config from '../../config.js';

const DB_HITS = {
    INSTANTIATIATE_COLLECTION: 0,
    CREATE_DOCUMENT: 0,
    READ_DOCUMENT: 0,
    UPDATE_DOCUMENT: 0,
    DELETE_DOCUMENT: 0,
};

const retentionPolicies = {
    production: [
        (event, operation) => event === 'ATTEMPT', // Don't log ATTEMPT events
        (event, operation) => event === 'CORE', // Don't log CORE events
    ],
    development: [],
    test: [(event, operation) => true],
};

class LogEventEmitter extends EventEmitter {
    events = {
        ATTEMPT: 'ATTEMPT',
        SUCCESS: 'SUCCESS',
        FAILED: 'FAILED',
        CORE: 'CORE',
        REPO: 'REPO',
        DB_HITS: 'DB_HITS',
        ERROR: 'ERROR',
    };

    emit(event, operation, ...args) {
        for (const policy of retentionPolicies[config.ENV])
            if (policy(event, operation)) return false;

        return super.emit(event, operation, ...args);
    }
}

const logEventEmitter = new LogEventEmitter().setMaxListeners(20);

logEventEmitter.on(logEventEmitter.events.ATTEMPT, (operation) => {
    Logger.info(getLogAttemptMsg(operation), {
        operationId: operation.id,
        operationType: operation.type,
        collectionId: operation.payload.collectionId,
    });
});

logEventEmitter.on(logEventEmitter.events.SUCCESS, (operation) => {
    Logger.info(getLogSuccessMsg(operation), {
        operationId: operation.id,
        operationType: operation.type,
        collectionId: operation.payload.collectionId,
    });
});

logEventEmitter.on(logEventEmitter.events.FAILED, (operation) => {
    Logger.warn(getLogFailedMsg(operation), {
        operationId: operation.id,
        operationType: operation.type,
        collectionId: operation.payload.collectionId,
    });
});

logEventEmitter.on(logEventEmitter.events.CORE, (operation) => {
    Logger.info(getLogCoreMsg(operation), {
        operationId: operation.id,
        operationType: operation.type,
        collectionId: operation.payload.collectionId,
    });
});

logEventEmitter.on(logEventEmitter.events.REPO, (operation) => {
    Logger.info(getLogRepoMsg(operation), {
        operationId: operation.id,
        operationType: operation.type,
        collectionId: operation.payload.collectionId,
    });
});

logEventEmitter.on(logEventEmitter.events.DB_HITS, (operation) => {
    const count = logDbHit(operation);
    if (count !== null) {
        Logger.info(getLogDbHitMsg(operation, count), {
            operationId: operation.id,
            operationType: operation.type,
            collectionId: operation.payload.collectionId,
        });
    } else {
        Logger.warn('DB Hit: Unknown operation type', {
            operationId: operation.id,
            operationType: operation.type,
            collectionId: operation.payload.collectionId,
        });
    }
});

logEventEmitter.on(logEventEmitter.events.ERROR, (operation, err) => {
    Logger.error(err.message, {
        operationId: operation.id,
        stack: err.stack,
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

function getLogCoreMsg(operation) {
    switch (operation.type) {
        case Operation.TYPES.CREATE_DOCUMENT:
            return 'Core Infiltrated: SaveDocument Use Case';
        case Operation.TYPES.GET_ONE_DOCUMENT:
            return 'Core Infiltrated: FindOneDocument Use Case';
        case Operation.TYPES.GET_DOCUMENTS:
            return 'Core Infiltrated: FindDocuments Use Case';
        case Operation.TYPES.UPDATE_DOCUMENT:
            return 'Core Infiltrated: UpdateDocument Use Case';
        case Operation.TYPES.DELETE_DOCUMENT:
            return 'Core Infiltrated: DeleteDocument UseCase';
        default:
            return 'Unknown Core Infiltration';
    }
}

function getLogRepoMsg(operation) {
    switch (operation.type) {
        case Operation.TYPES.CREATE_DOCUMENT:
            return 'Repo Infiltrated: create';
        case Operation.TYPES.GET_ONE_DOCUMENT:
            return 'Repo Infiltrated: read';
        case Operation.TYPES.GET_DOCUMENTS:
            return 'Repo Infiltrated: read';
        case Operation.TYPES.UPDATE_DOCUMENT:
            return 'Repo Infiltrated: update';
        case Operation.TYPES.DELETE_DOCUMENT:
            return 'Repo Infiltrated: delete';
        default:
            return 'Unknown Repo Infiltration';
    }
}

function getLogDbHitMsg(operation, count) {
    switch (operation.type) {
        case Operation.TYPES.CREATE_DOCUMENT:
            return `DB Hit: create - ${count}`;
        case Operation.TYPES.GET_ONE_DOCUMENT:
            return `DB Hit: read - ${count}`;
        case Operation.TYPES.GET_DOCUMENTS:
            return `DB Hit: read - ${count}`;
        case Operation.TYPES.UPDATE_DOCUMENT:
            return `DB Hit: update - ${count}`;
        case Operation.TYPES.DELETE_DOCUMENT:
            return `DB Hit: delete - ${count}`;
        default:
            return `DB Hit: unknown - ${count}`;
    }
}

function logDbHit(operation) {
    if (Object.prototype.hasOwnProperty.call(DB_HITS, operation.type)) {
        DB_HITS[operation.type]++;
        return DB_HITS[operation.type];
    } else if (operation.type === Operation.TYPES.GET_ONE_DOCUMENT || operation.type === Operation.TYPES.GET_DOCUMENTS) {
        DB_HITS.READ_DOCUMENT++;
        return DB_HITS.READ_DOCUMENT;
    }
}

export default logEventEmitter;
