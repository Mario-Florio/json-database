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
    ITEM_NOT_FOUND
} from './response-tokens.js';

const dbPath = process.env.DBPATH || config.DBPATH;

class DB {
    #dbFile;
    #IO_SERVICE;

    constructor(collectionName) {
        this.#dbFile = dbPath+collectionName+'.json';
        this.#IO_SERVICE = IO_SERVICE;
    }
    async instantiate() {
        if (this.#dbFileExists()) return new Result({ message: DB_ALREADY_EXISTS, success: false });

        await this.#IO_SERVICE.writeFile({ path: this.#dbFile, data: JSON.stringify([]) });
        return new Result({ message: INSTANTIATION_SUCCESSFUL, success: true });
    }
    async create(obj) {
        if (!obj) return new Result({ message: NO_DATA, success: false });
        if (!this.#dbFileExists()) await this.instantiate();

        const result = await this.read();
        if (!result.success) return result;

        const { data } = result;
        data.push(obj);
        await this.#IO_SERVICE.writeFile({ path: this.#dbFile, data: JSON.stringify(data) });

        return new Result({ message: SAVE_SUCCESSFUL, success: true });
    }
    async read() {
        if (!this.#dbFileExists()) await this.instantiate();

        const json = await this.#IO_SERVICE.readFile({ path: this.#dbFile, encoding: 'utf-8' });
        const data = JSON.parse(json);
        return new Result({ message: READ_SUCCESSFUL, success: true })
                    .setData(data);
    }
    async update(_id, updatedObj) {
        if (!_id) return new Result({ message: NO_ID, success: false });

        const result = await this.delete(_id);
        if (!result.success) return result;

        await this.create(updatedObj);
        return new Result({ message: UPDATE_SUCCESSFUL, success: true });
    }
    async delete(_id) {
        if (!_id) return new Result({ message: NO_ID, success: false });
        if (!this.#dbFileExists()) await this.instantiate();

        const result = await this.read();
        if (!result.success) return result;

        const { data } = result;
        const filteredData = data.filter(item => item._id !== _id);

        if (data.length === filteredData.length) return new Result({ message: ITEM_NOT_FOUND, success: false });

        await this.#IO_SERVICE.writeFile({ path: this.#dbFile, data: JSON.stringify(filteredData) });
        
        return new Result({ message: DELETE_SUCCESSFUL, success: true });
    }
    #dbFileExists() {
        return this.#IO_SERVICE.existsSync({ path: this.#dbFile });
    }
    setIO_SERVICE(stubIOService) {
        if (typeof stubIOService !== 'object' || typeof stubIOService.constructor !== 'function' || stubIOService.constructor.name !== 'STUB_IO_SERVICE')
            throw new TypeError('stubIOService must be instance of STUB_IO_SERVICE');

        this.#IO_SERVICE = stubIOService;
    }
}

export default DB;