import AbstractLogger from './AbstractLogger.js';
import Attempt from './logTasks/Attempt.js';
import Success from './logTasks/Success.js';
import Failure from './logTasks/Failure.js';
import Core from './logTasks/Core.js';
import Repo from './logTasks/Repo.js';
import DbHits from './logTasks/DbHits.js';
import Err from './logTasks/Err.js';
import LogTask from './logTasks/LogTask.js';
import { config, isSubclassOf, must } from './imports.js';

const logTasks = {
    ATTEMPT: Attempt,
    SUCCESS: Success,
    FAILURE: Failure,
    CORE: Core,
    REPO: Repo,
    DB_HITS: DbHits,
    ERROR: Err,
};

const filterPolicies = {
    // Define policies for different environments via filter functions
    production: [
        (logTask, operation) => logTask === logTasks.ATTEMPT, // Don't log ATTEMPT logTask
        (logTask, operation) => logTask === logTasks.CORE, // Don't log CORE logTask
        (logTask, operation) => logTask === logTasks.REPO, // Don't log REPO logTask
        (logTask, operation) => logTask === logTasks.DB_HITS, // Don't log DB_HITS logTask
    ],
    development: [],
    test: [(logTask, operation) => true], // Don't log anything in test environment (return true for all events/operations)
};

class LogTaskDispatcher {
    static #logTasks = logTasks;

    static get logTasks() {
        return LogTaskDispatcher.#logTasks;
    }

    get logTasks() {
        return LogTaskDispatcher.#logTasks;
    }

    dispatch(logTask, operation, ...args) {
        must(
            isSubclassOf(logTask, LogTask),
            'Invalid Type – type must be an instance of LogTask',
        );
        for (const policy of filterPolicies[config.ENV])
            if (policy(logTask, operation)) return false;

        const logger = new AbstractLogger(config.LOGGER || console);
        new logTask(logger).log(operation, ...args);
    }
}

export default LogTaskDispatcher;
