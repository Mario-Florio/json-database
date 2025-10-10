import LogTask from './LogTask.js';

class Err extends LogTask {
    log(operation, err) {
        this.logger.error(err.message, {
            operationType: operation.type,
            operationId: operation.id,
            collectionId: operation.collectionId,
            stack: err.stack.split('\n').join('\n\t'),
        });
    }
}

export default Err;
