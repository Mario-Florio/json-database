class Logger {
    #logger;

    constructor(logger) {
        if (!logger) {
            this.#logger = console;
        } else {
            this.#logger = logger;
        }
    }

    info(message) {
        const entry = {
            level: 'info',
            message,
            time: new Date().toISOString(),
        };

        this.#logger.info(entry);
    }

    warn(message) {
        const entry = {
            level: 'warn',
            message,
            time: new Date().toISOString(),
        };

        this.#logger.warn(entry);
    }

    error(message) {
        const entry = {
            level: 'error',
            message,
            time: new Date().toISOString(),
        };

        this.#logger.error(entry);
    }

    set logger(logger) {
        this.#logger = logger;
    }

    get logger() {
        return this.#logger;
    }
}

export default Logger;
