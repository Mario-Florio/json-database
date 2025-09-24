import IO_SERVICE from './IO-Service.js';
import Result from '../../core/entities/Result.js';
import config from '../../config.js';
import {
    DB_ALREADY_EXISTS,
    INSTANTIATION_SUCCESSFUL,
    SAVE_SUCCESSFUL,
    READ_SUCCESSFUL,
    UPDATE_SUCCESSFUL,
    DELETE_SUCCESSFUL,
    NO_DATA,
    NO_ID,
    ITEM_NOT_FOUND,
} from './response-tokens.js';
import DocReader from '../../core/entities/DocReader.js';

const dbPath = process.env.DBPATH || config.DBPATH;

class DB {
    #dbFile;
    #IO_SERVICE;

    constructor(collectionName) {
        this.#dbFile = dbPath + collectionName + '.json';
        this.#IO_SERVICE = IO_SERVICE;
    }
    async instantiate() {
        if (this.#dbFileExists())
            return new Result({ message: DB_ALREADY_EXISTS, success: false });

        await this.#IO_SERVICE.writeFile({
            path: this.#dbFile,
            data: '',
        });
        return new Result({ message: INSTANTIATION_SUCCESSFUL, success: true });
    }
    async create(obj) {
        if (!obj) return new Result({ message: NO_DATA, success: false });
        if (!this.#dbFileExists()) await this.instantiate();

        await this.#IO_SERVICE.appendFile({
            path: this.#dbFile,
            data: JSON.stringify(obj) + '\n',
        });

        return new Result({ message: SAVE_SUCCESSFUL, success: true });
    }
    async read() {
        if (!this.#dbFileExists()) await this.instantiate();

        const lineGenerator = this.#IO_SERVICE.readLines({
            path: this.#dbFile,
            encoding: 'utf-8',
        });
        const reader = new DocReader(lineGenerator, (json) => JSON.parse(json));
        return new Result({ message: READ_SUCCESSFUL, success: true }).setGen(
            reader.read(),
        );
    }
    async update(_id, updatedObj) {
        if (!_id) return new Result({ message: NO_ID, success: false });
        if (!this.#dbFileExists()) await this.instantiate();

        const res = await this.#IO_SERVICE.writeLine({
            path: this.#dbFile,
            predicate: (obj) => obj._id === _id,
            updater: (obj) => updatedObj,
        });

        if (res.itemFound === false)
            return new Result({ message: ITEM_NOT_FOUND, success: false });

        return new Result({ message: UPDATE_SUCCESSFUL, success: true });
    }
    async delete(_id) {
        if (!_id) return new Result({ message: NO_ID, success: false });
        if (!this.#dbFileExists()) await this.instantiate();

        const res = await this.#IO_SERVICE.writeLine({
            path: this.#dbFile,
            predicate: (obj) => obj._id === _id,
            updater: () => null,
        });

        if (res.itemFound === false)
            return new Result({ message: ITEM_NOT_FOUND, success: false });

        return new Result({ message: DELETE_SUCCESSFUL, success: true });
    }
    #dbFileExists() {
        return this.#IO_SERVICE.existsSync({ path: this.#dbFile });
    }
    setIO_SERVICE(stubIOService) {
        if (
            typeof stubIOService !== 'object' ||
            typeof stubIOService.constructor !== 'function' ||
            stubIOService.constructor.name !== 'STUB_IO_SERVICE'
        )
            throw new TypeError(
                'stubIOService must be instance of STUB_IO_SERVICE',
            );

        this.#IO_SERVICE = stubIOService;
    }
}

export default DB;
