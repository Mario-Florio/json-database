import implementsInterface from '../../core/use-cases/__utils__/implementsInterface.js';
import ILogger from '../../core/ports/ILogger.js';
import config from '../../config.js';

const BLUE = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

class Logger {
    #logger;
    #INFO = `[${BLUE}INFO${RESET}]`;
    #WARN = `[${YELLOW}WARN${RESET}]`;
    #ERROR = `[${RED}ERROR${RESET}]`;

    constructor(logger) {
        if (!logger) {
            this.#logger = console;
        } else {
            if (!implementsInterface(logger, ILogger))
                throw new Error('Invalid Interface implementation');

            this.#logger = logger;
        }
    }

    info(message, meta = {}) {
        const entry = new LogEntry('info', message, meta);

        this.#logger.info(this.#formatEntry(entry));
    }

    warn(message, meta = {}) {
        const entry = new LogEntry('warn', message, meta);

        this.#logger.warn(this.#formatEntry(entry));
    }

    error(message, meta = {}) {
        const entry = new LogEntry('error', message, meta);

        this.#logger.error(this.#formatEntry(entry));
    }

    #formatEntry(entry) {
        if (config.LOGGER_PRETTY_PRINT === true) {
            return this.#prettyPrint(entry);
        } else {
            return JSON.stringify(entry);
        }
    }

    #prettyPrint(object) {
        if (typeof object !== 'object') {
            throw new Error('Input must be an object');
        }

        let prettyStr = '';

        if (object.level === 'info') {
            prettyStr += this.#INFO;
        } else if (object.level === 'warn') {
            prettyStr += this.#WARN;
        } else if (object.level === 'error') {
            prettyStr += this.#ERROR;
        }

        prettyStr += ' ' + object.message;

        prettyStr += ` | ${GREEN}${object.time}${RESET}`;

        const metaKeys = Object.keys(object.meta);
        if (metaKeys.length === 0) return prettyStr;

        prettyStr += '\n';

        for (const [key, value] of Object.entries(object.meta)) {
            prettyStr += ` | ${GREEN}${key}${RESET}: ${value}`;
        }

        return prettyStr;
    }

    set logger(logger) {
        if (!implementsInterface(logger, ILogger))
            throw new Error('Invalid Interface implementation');

        this.#logger = logger;
    }

    get logger() {
        return this.#logger;
    }
}

class LogEntry {
    constructor(level, message, meta = {}) {
        this.level = level;
        this.message = message;
        this.time = new Date().toISOString();
        this.meta = meta;
    }
}

export default Logger;
