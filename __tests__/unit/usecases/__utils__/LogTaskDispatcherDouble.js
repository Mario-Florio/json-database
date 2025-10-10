class LogTaskDispatcherDouble {
    static #logTasks = {
        ATTEMPT: { log },
        SUCCESS: { log },
        FAILURE: { log },
        CORE: { log },
        REPO: { log },
        DB_HITS: { log },
        ERROR: { log },
    };
    static get logTasks() {
        return LogTaskDispatcherDouble.#logTasks;
    }
    get logTasks() {
        return LogTaskDispatcherDouble.#logTasks;
    }
    dispatch(logTask, operation, ...args) {
        logTask.log();
    }
}

function log(...args) {}

export default LogTaskDispatcherDouble;
