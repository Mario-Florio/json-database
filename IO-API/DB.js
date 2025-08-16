const IO_SERVICE = require("./IO-Service.js");
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
        if (this.#dbFileExists()) throw new Error(DB_ALREADY_EXISTS);

        this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify([]) });
        return { message: INSTANTIATION_SUCCESSFUL };
    }
    create(obj) {
        if (!obj) throw new Error(NO_DATA);
        if (!this.#dbFileExists()) throw new Error(DB_DOESNT_EXIST);

        const data = this.read();
        data.push(obj);
        this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify(data) });

        return { message: SAVE_SUCCESSFUL };
    }
    read() {
        if (!this.#dbFileExists()) throw new Error(DB_DOESNT_EXIST);

        const json = this.#IO_SERVICE.readFileSync({ path: this.#dbFile, encoding: 'utf-8' });
        return JSON.parse(json);
    }
    update(_id, updatedObj) {
        if (!_id) throw new Error(NO_ID);

        this.delete(_id);
        this.create(updatedObj);
        return { message: UPDATE_SUCCESSFUL };
    }
    delete(_id) {
        if (!_id) throw new Error(NO_ID);
        if (!this.#dbFileExists()) throw new Error(DB_DOESNT_EXIST);

        const data = this.read(this.#dbFile);
        const filteredData = data.filter(item => item._id !== _id);

        if (data.length === filteredData.length) throw new Error(ITEM_NOT_FOUND);

        this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify(filteredData) });
        
        return { message: DELETE_SUCCESSFUL };
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