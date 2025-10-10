import LogTask from './LogTask.js';
import { Operation } from '../imports.js';

const DB_HITS = {
    INSTANTIATIATE_COLLECTION: 0,
    CREATE_DOCUMENT: 0,
    READ_DOCUMENT: 0,
    UPDATE_DOCUMENT: 0,
    DELETE_DOCUMENT: 0,
};

class DbHits extends LogTask {
    log(operation) {
        const count = this.#incrementDbHit(operation);
        if (count !== null) {
            this.logger.info(this.#getMsg(operation, count), {
                operationId: operation.id,
                operationType: operation.type,
                collectionId: operation.collectionId,
            });
        } else {
            this.logger.warn('DB Hit: Unknown operation type', {
                operationId: operation.id,
                operationType: operation.type,
                collectionId: operation.collectionId,
            });
        }
    }

    #getMsg(operation, count) {
        switch (operation.type) {
            case Operation.types.CREATE_DOCUMENT:
                return `DB Hit: create - ${count}`;
            case Operation.types.GET_ONE_DOCUMENT:
            case Operation.types.GET_DOCUMENTS:
                return `DB Hit: read - ${count}`;
            case Operation.types.UPDATE_DOCUMENT:
                return `DB Hit: update - ${count}`;
            case Operation.types.DELETE_DOCUMENT:
                return `DB Hit: delete - ${count}`;
            default:
                return null;
        }
    }

    #incrementDbHit(operation) {
        if (Object.prototype.hasOwnProperty.call(DB_HITS, operation.type)) {
            DB_HITS[operation.type]++;
            return DB_HITS[operation.type];
        } else if (
            operation.type === Operation.types.GET_ONE_DOCUMENT ||
            operation.type === Operation.types.GET_DOCUMENTS
        ) {
            DB_HITS.READ_DOCUMENT++;
            return DB_HITS.READ_DOCUMENT;
        }
    }
}

export default DbHits;
