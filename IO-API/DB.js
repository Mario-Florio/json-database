const IO_SERVICE = require("./IO-Service.js");

class DB {
    #dbFile;
    #IO_SERVICE;

    constructor(dbFile) {
        this.#dbFile = dbFile+'.json';
        this.#IO_SERVICE = IO_SERVICE;
    }
    instantiate() {
        if (!this.#dbFileExists()) {
            this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify([]) });
            return 'Instantiation successful';
        } else {
            return 'Datebase already exists';
        }
    }
    create(obj) {
        try {
            if (!obj) return 'Please provide data to save';

            const data = this.read();
            data.push(obj);
            this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify(data) });

            return 'Save successful';
        } catch (err) {
            return 'Save failed';
        }
    }
    read() {
        try {
            if (!this.#dbFileExists()) return 'Database does not exist';

            const json = this.#IO_SERVICE.readFileSync({ path: this.#dbFile, encoding: 'utf-8' });
            return JSON.parse(json);
        } catch(err) {
            return 'Fetch failed';
        }
    }
    update(_id, updatedObj) {
        try {
            if (!_id) return 'No item id was supplied';

            this.delete(_id);
            this.create(updatedObj);
            return 'Update successful';
        } catch(err) {
            return 'Update failed';
        }
    }
    delete(_id) {
        try {
            if (!_id) return 'No item id was supplied';
            if (!this.#dbFileExists()) return 'Database does not exist';

            const data = this.read(this.#dbFile);
            const filteredData = data.filter(item => item._id !== _id);

            if (data.length === filteredData.length) return 'Item was not found';

            this.#IO_SERVICE.writeFileSync({ path: this.#dbFile, data: JSON.stringify(filteredData) });
            
            return 'Deletion successful';
        } catch(err) {
            return 'Deletion failed';
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