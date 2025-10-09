import LogTask from './LogTask.js';

class Err extends LogTask {
    log(operation, err) {
        this.logger.error(err.message, {
            operationId: operation.id,
            stack: err.stack,
        });
    }
}

export default Err;
