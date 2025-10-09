import LogTask from './LogTask.js';
import { Operation } from '../imports.js';

class Repo extends LogTask {
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
                return 'Repo Infiltrated: create';
            case Operation.types.GET_ONE_DOCUMENT:
            case Operation.types.GET_DOCUMENTS:
                return 'Repo Infiltrated: read';
            case Operation.types.UPDATE_DOCUMENT:
                return 'Repo Infiltrated: update';
            case Operation.types.DELETE_DOCUMENT:
                return 'Repo Infiltrated: delete';
            default:
                return 'Unknown Repo Infiltration';
        }
    }
}

export default Repo;
