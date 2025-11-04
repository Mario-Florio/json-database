import path from 'node:path';
import IO_SERVICE from '../IO-API/IO-Service.js';
import config from '../../config.js';

export default class FileStream {
    #path;
    #IO_SERVICE;

    constructor(file) {
        this.#path = path.join(config.LOGPATH, file + '.ndjson');
        this.#IO_SERVICE = IO_SERVICE;
    }

    info(entry) {
        this.#IO_SERVICE.appendFileSync({
            path: this.#path,
            data: entry + '\n',
        });
    }

    warn(entry) {
        this.#IO_SERVICE.appendFileSync({
            path: this.#path,
            data: entry + '\n',
        });
    }

    error(entry) {
        this.#IO_SERVICE.appendFileSync({
            path: this.#path,
            data: entry + '\n',
        });
    }
}
