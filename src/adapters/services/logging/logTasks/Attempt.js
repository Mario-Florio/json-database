import LogTask from './LogTask.js';
import { Operation } from '../imports.js';

class Attempt extends LogTask {
    log(operation) {
        this.logger.info(this.#getMsg(operation), {
            operationId: operation.id,
            operationType: operation.type,
            collectionId: operation.collectionId,
        });
    }

    #getMsg(operation) {
        switch (operation.type) {
            case Operation.types.INSTANTIATE_COLLECTION:
                return 'Instantiation Attempt: Instantiating collection';
            case Operation.types.CREATE_DOCUMENT:
                return 'Create Attempt: Creating document';
            case Operation.types.GET_ONE_DOCUMENT:
                return 'Query Attempt: Finding document';
            case Operation.types.GET_DOCUMENTS:
                return 'Query Attempt: Finding documents';
            case Operation.types.UPDATE_DOCUMENT:
                return 'Update Attempt: Updating document';
            case Operation.types.DELETE_DOCUMENT:
                return 'Delete Attempt: Deleting document';
            default:
                return 'Unknown Attempt';
        }
    }
}

export default Attempt;
