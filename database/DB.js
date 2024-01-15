const fs = require('fs');

class DB {
    constructor(dbName) {
        this.dbName = dbName+'.json';
    }
    instantiate() {
        if (!fs.existsSync(this.dbName)) {
            fs.writeFileSync(this.dbName, JSON.stringify([]));
            return 'Instantiation successful';
        } else {
            return 'Datebase already exists';
        }
    }
    create(obj) {
        if (!obj) {
            return 'Please provide data to save';
        }
        try {
            if (fs.existsSync(this.dbName)) {
                const data = this.read(this.dbName);
                data.push(obj);
                fs.writeFileSync(this.dbName, JSON.stringify(data));
                return 'Save successful';
            } else {
                fs.writeFileSync(this.dbName, JSON.stringify([obj]));
                return 'Save successful';
            }
        } catch (err) {
            return 'Save failed';
        }
    }
    read() {
        try {
            if (!fs.existsSync(this.dbName)) {
                return 'Database does not exist';
            } else {
                const data = fs.readFileSync(this.dbName, 'utf-8');
                return JSON.parse(data);
            }
        } catch(err) {
            return 'Fetch failed';
        }
    }
    update(_id, updatedObj) {
        if (!_id) return 'No item id was supplied';
        try {
            this.delete(_id);
            this.create(updatedObj);
            return 'Update successful';
        } catch(err) {
            return 'Update failed';
        }
    }
    delete(_id) {
        if (!_id) return 'No item id was supplied';
        try {
            if (!fs.existsSync(this.dbName)) {
                return 'Database does not exist';
            } else {
                const data = this.read(this.dbName);
                const filteredData = data.filter(item => item._id !== _id);
                if (data.length === filteredData.length) {
                    return 'Item was not found';
                } else {
                    fs.writeFileSync(this.dbName, JSON.stringify(filteredData));
                    return 'Deletion successful';
                }
            }
        } catch(err) {
            return 'Deletion failed';
        }
    }
}

module.exports = DB;