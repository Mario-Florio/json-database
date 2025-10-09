import LogTask from './LogTask.js';
import { Operation } from '../imports.js';

class Success extends LogTask {
    log(operation) {
        this.logger.info(this.#getMsg(operation), {
            operationId: operation.id,
            operationType: operation.type,
            collectionId: operation.collectionId,
        });
    }

    #getMsg(operation) {
        switch (operation.type) {
            case Operation.types.CREATE_DOCUMENT:
                return 'Create Successful: Document created';
            case Operation.types.GET_ONE_DOCUMENT:
                return 'Query Successful: Found one document';
            case Operation.types.GET_DOCUMENTS:
                return 'Query Successful: Found documents';
            case Operation.types.UPDATE_DOCUMENT:
                return 'Update Successful: Document updated';
            case Operation.types.DELETE_DOCUMENT:
                return 'Delete Successful: Document deleted';
            default:
                return 'Unknown Success';
        }
    }
}

export default Success;
