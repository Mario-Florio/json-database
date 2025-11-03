import Result from '../../../core/entities/Result.js';
import LogTaskDispatcher from '../../services/logging/LogTaskDispatcher.js';
import ContractError from '../../../shared/contracts/__utils__/ContractError.js';

const { ERROR } = LogTaskDispatcher.logTasks;

export default function errorHandler(err, operationObj) {
    if (err instanceof ContractError) throw new ContractError(err.message);
    const logTaskDispatcher = new LogTaskDispatcher();
    logTaskDispatcher.dispatch(ERROR, operationObj, err);
    return new Result({ message: err.message, success: false });
}
