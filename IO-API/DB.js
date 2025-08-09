const IO_SERVICE = require("./IO-Service.js");
const config = require('../config.js');

const dbPath = process.env.DBPATH || config.DBPATH;

class DB {
    #dbFile;
    #IO_SERVICE;

    constructor(collectionName) {
        this.#dbFile = dbPath+collectionName+'.json';
        this.#IO_SERVICE = IO_SERVICE;
    }
    instantiate() {
        if (this.#dbFileExists()) throw new Error('Datebase already exists');

        this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify([]) });
        return { message: 'Instantiation successful' };
    }
    create(obj) {
        if (!obj) throw new Error('Please provide data to save');
        if (!this.#dbFileExists()) throw new Error('Database does not exist');

        const data = this.read();
        data.push(obj);
        this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify(data) });

        return { message: 'Save successful' };
    }
    read() {
        if (!this.#dbFileExists()) throw new Error('Database does not exist');

        const json = this.#IO_SERVICE.readFileSync({ path: this.#dbFile, encoding: 'utf-8' });
        return JSON.parse(json);
    }
    update(_id, updatedObj) {
        if (!_id) throw new Error('No item id was supplied');

        this.delete(_id);
        this.create(updatedObj);
        return { message: 'Update successful' };
    }
    delete(_id) {
        if (!_id) throw new Error('No item id was supplied');
        if (!this.#dbFileExists()) throw new Error('Database does not exist');

        const data = this.read(this.#dbFile);
        const filteredData = data.filter(item => item._id !== _id);

        if (data.length === filteredData.length) throw new Error('Item was not found');

        this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify(filteredData) });
        
        return { message: 'Deletion successful' };
    }
    #dbFileExists() {
        return this.#IO_SERVICE.existsSync({ path: this.#dbFile });
    }
    setIO_SERVICE(stubIOService) {
        if (typeof stubIOService !== 'object' || typeof stubIOService.constructor !== 'function' || stubIOService.constructor.name !== 'STUB_IO_SERVICE')
            throw new Error('Invalid Type: schema must be an instance of Schema');

        this.#IO_SERVICE = stubIOService;
    }
}

module.exports = DB;