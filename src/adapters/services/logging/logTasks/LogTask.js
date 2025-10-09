import AbstractLogger from '../AbstractLogger.js';
import { config, must } from '../imports.js';

class LogTask {
    #logger = new AbstractLogger(config.LOGGER || console);

    get logger() {
        return this.#logger;
    }

    constructor(logger) {
        must(
            logger instanceof AbstractLogger,
            'Invalid Type – logger must be an instance of AbstractLogger',
        );
        this.#logger = logger || new AbstractLogger(config.LOGGER || console);
    }
}

export default LogTask;
