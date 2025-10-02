import implementsInterface from '../../core/use-cases/__utils__/implementsInterface.js';
import ILogger from '../../core/ports/ILogger.js';
import config from '../../config.js';

const BLUE = '\x1b[36m';
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

    info(message) {
        const entry = { level: 'info', message, time: new Date().toISOString() };

        if (config.LOGGER_PRETTY_PRINT === true) {
            this.#logger.info(this.prettyPrinter(entry));
            return;
        }

        this.#logger.info(JSON.stringify(entry));
    }

    warn(message) {
        const entry = { level: 'warn', message, time: new Date().toISOString() };

        if (config.LOGGER_PRETTY_PRINT === true) {
            this.#logger.warn(this.prettyPrinter(entry));
            return;
        }

        this.#logger.warn(JSON.stringify(entry));
    }

    error(message) {
        const entry = { level: 'error', message, time: new Date().toISOString() };

        if (config.LOGGER_PRETTY_PRINT === true) {
            this.#logger.error(this.prettyPrinter(entry));
            return;
        }

        this.#logger.error(JSON.stringify(entry));
    }

    prettyPrinter(object) {
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

        for (const [key, value] of Object.entries(object)) {
            if (key !== 'level' && key !== 'message') {
                prettyStr += ` | ${key}: ${value}`;
            }
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

export default Logger;
