import LogTask from './LogTask.js';
import { Operation } from '../imports.js';

class Core extends LogTask {
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
                return 'Core Infiltrated: SaveDocument Use Case';
            case Operation.types.GET_ONE_DOCUMENT:
                return 'Core Infiltrated: FindOneDocument Use Case';
            case Operation.types.GET_DOCUMENTS:
                return 'Core Infiltrated: FindDocuments Use Case';
            case Operation.types.UPDATE_DOCUMENT:
                return 'Core Infiltrated: UpdateDocument Use Case';
            case Operation.types.DELETE_DOCUMENT:
                return 'Core Infiltrated: DeleteDocument UseCase';
            default:
                return 'Unknown Core Infiltration';
        }
    }
}

export default Core;
