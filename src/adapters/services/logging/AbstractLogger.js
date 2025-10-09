class AbstractLogger {
    #logger;

    constructor(logger) {
        this.#logger = logger || console;
    }

    info(message, meta = {}) {
        this.#logger.info(message, meta);
    }

    warn(message, meta = {}) {
        this.#logger.warn(message, meta);
    }

    error(message, meta = {}) {
        this.#logger.error(message, meta);
    }
}

export default AbstractLogger;
