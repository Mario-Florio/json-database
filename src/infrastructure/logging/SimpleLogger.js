import prettyPrint from './__utils__/prettyPrint.js';

class SimpleLogger {
    #out;
    #pretty_print = true;

    constructor(out) {
        this.#out = out;
    }

    info(message, meta = {}) {
        const entry = new LogEntry('info', message, meta);

        this.#out.info(entry.format({ pretty_print: this.#pretty_print }));
    }

    warn(message, meta = {}) {
        const entry = new LogEntry('warn', message, meta);

        this.#out.warn(entry.format({ pretty_print: this.#pretty_print }));
    }

    error(message, meta = {}) {
        const entry = new LogEntry('error', message, meta);

        this.#out.error(entry.format({ pretty_print: this.#pretty_print }));
    }

    setPrettyPrint(bool) {
        this.#pretty_print = bool;
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

    format({ pretty_print }) {
        if (pretty_print === true) {
            return prettyPrint(this);
        } else {
            return JSON.stringify(this);
        }
    }
}

export default SimpleLogger;
