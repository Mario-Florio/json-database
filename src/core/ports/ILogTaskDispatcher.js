class ILogTaskDispatcher {
    static #logTypes = {};
    static get logTypes() {
        return this.#logTypes;
    }
    dispatch(logType, operation, ...args) {}
}

export default ILogTaskDispatcher;
