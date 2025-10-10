class ILogTaskDispatcher {
    static #logTasks = {};
    static get logTasks() {
        return ILogTaskDispatcher.#logTasks;
    }
    get logTasks() {
        return ILogTaskDispatcher.#logTasks;
    }
    dispatch(logTask, operation, ...args) {}
}

export default ILogTaskDispatcher;
