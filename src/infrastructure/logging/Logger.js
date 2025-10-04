import prettyPrint from './__utils__/prettyPrint.js';
import config from '../../config.js';

class Logger {
    static #logger = config.LOGGER || console;

    static info(message, meta = {}) {
        const entry = new LogEntry('info', message, meta);

        Logger.#logger.info(entry.format());
    }

    static warn(message, meta = {}) {
        const entry = new LogEntry('warn', message, meta);

        Logger.#logger.warn(entry.format());
    }

    static error(message, meta = {}) {
        const entry = new LogEntry('error', message, meta);

        Logger.#logger.error(entry.format());
    }
}

// UTILS
class LogEntry {
    constructor(level, message, meta = {}) {
        this.level = level;
        this.message = message;
        this.time = new Date().toISOString();
        this.meta = meta;
    }

    format() {
        if (config.LOGGER_PRETTY_PRINT === true) {
            return prettyPrint(this);
        } else {
            return JSON.stringify(this);
        }
    }
}

export default Logger;
