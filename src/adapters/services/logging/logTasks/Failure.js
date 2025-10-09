import LogTask from './LogTask.js';
import { Operation } from '../imports.js';

class Failure extends LogTask {
    log(operation) {
        this.logger.warn(this.#getMsg(operation), {
            operationId: operation.id,
            operationType: operation.type,
            collectionId: operation.collectionId,
        });
    }

    #getMsg(operation) {
        switch (operation.type) {
            case Operation.types.CREATE_DOCUMENT:
                return 'Create Failed: Document not created';
            case Operation.types.GET_ONE_DOCUMENT:
                return 'Query Failed: No document found';
            case Operation.types.GET_DOCUMENTS:
                return 'Query Failed: No documents found';
            case Operation.types.UPDATE_DOCUMENT:
                return 'Update Failed: Document not updated';
            case Operation.types.DELETE_DOCUMENT:
                return 'Delete Failed: Document not deleted';
            default:
                return 'Unknown Failure';
        }
    }
}

export default Failure;
