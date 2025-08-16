const IO_SERVICE = require("./IO-Service.js");
const Result = require('../core/entities/Result.js');
const config = require('../config.js');
const {
    DB_ALREADY_EXISTS,
    DB_DOESNT_EXIST,
    INSTANTIATION_SUCCESSFUL,
    SAVE_SUCCESSFUL,
    READ_SUCCESSFUL,
    UPDATE_SUCCESSFUL,
    DELETE_SUCCESSFUL,
    NO_DATA,
    NO_ID,
    ITEM_NOT_FOUND
} = require('./response-tokens.js');

const dbPath = process.env.DBPATH || config.DBPATH;

class DB {
    #dbFile;
    #IO_SERVICE;

    constructor(collectionName) {
        this.#dbFile = dbPath+collectionName+'.json';
        this.#IO_SERVICE = IO_SERVICE;
    }
    instantiate() {
        if (this.#dbFileExists()) return new Result({ message: DB_ALREADY_EXISTS, success: false });

        this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify([]) });
        return new Result({ message: INSTANTIATION_SUCCESSFUL, success: true });
    }
    create(obj) {
        if (!obj) return new Result({ message: NO_DATA, success: false });
        if (!this.#dbFileExists()) return new Result({ message: DB_DOESNT_EXIST, success: false });

        const result = this.read();
        if (!result.success) return result;

        const { data } = result;
        data.push(obj);
        this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify(data) });

        return new Result({ message: SAVE_SUCCESSFUL, success: true });
    }
    read() {
        if (!this.#dbFileExists()) return new Result({ message: DB_DOESNT_EXIST, success: false });

        const json = this.#IO_SERVICE.readFileSync({ path: this.#dbFile, encoding: 'utf-8' });
        const data = JSON.parse(json);
        return new Result({ message: READ_SUCCESSFUL, success: true })
                    .addData(data);
    }
    update(_id, updatedObj) {
        if (!_id) return new Result({ message: NO_ID, success: false });

        const result = this.delete(_id);
        if (!result.success) return result;

        this.create(updatedObj);
        return new Result({ message: UPDATE_SUCCESSFUL, success: true });
    }
    delete(_id) {
        if (!_id) return new Result({ message: NO_ID, success: false });
        if (!this.#dbFileExists()) return new Result({ message: DB_DOESNT_EXIST, success: false });

        const result = this.read();
        if (!result.success) return result;

        const { data } = result;
        const filteredData = data.filter(item => item._id !== _id);

        if (data.length === filteredData.length) return new Result({ message: ITEM_NOT_FOUND, success: false });

        this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify(filteredData) });
        
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

module.exports = DB;