const IO_SERVICE = require("./IO-Service.js");

class DB {
    #dbFile;
    #IO_SERVICE;

    constructor(dbFile) {
        this.#dbFile = dbFile+'.json';
        this.#IO_SERVICE = IO_SERVICE;
    }
    instantiate() {
        try {
            if (this.#dbFileExists()) throw new Error('Datebase already exists');

            this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify([]) });
            return { message: 'Instantiation successful' };
        } catch (err) {
            return { message: err.message };
        }
    }
    create(obj) {
        try {
            if (!obj) throw new Error('Please provide data to save');
            if (!this.#dbFileExists()) throw new Error('Database does not exist');

            const data = this.read();
            data.push(obj);
            this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify(data) });

            return { message: 'Save successful' };
        } catch (err) {
            return { message: err.message };
        }
    }
    read() {
        try {
            if (!this.#dbFileExists()) throw new Error('Database does not exist');

            const json = this.#IO_SERVICE.readFileSync({ path: this.#dbFile, encoding: 'utf-8' });
            return JSON.parse(json);
        } catch(err) {
            return { message: err.message };
        }
    }
    update(_id, updatedObj) {
        try {
            if (!_id) throw new Error('No item id was supplied');

            this.delete(_id);
            this.create(updatedObj);
            return { message: 'Update successful' };
        } catch(err) {
            return { message: err.message };
        }
    }
    delete(_id) {
        try {
            if (!_id) throw new Error('No item id was supplied');
            if (!this.#dbFileExists()) throw new Error('Database does not exist');

            const data = this.read(this.#dbFile);
            const filteredData = data.filter(item => item._id !== _id);

            if (data.length === filteredData.length) throw new Error('Item was not found');

            this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify(filteredData) });
            
            return { message: 'Deletion successful' };
        } catch(err) {
            return { message: err.message };
        }
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