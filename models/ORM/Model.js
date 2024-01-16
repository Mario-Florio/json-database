const DB = require('../../database/DB.js');

function createModel(dbName) {
    const db = new DB(dbName);

    class Model {
        constructor() {
            this._id = uid();
            this.createdAt = new Date().toString();
        }
        static DB = db;
        // SETUP
        static queryMethodMap = {
            //method: parameters
            find: ['classKeys'],
            findById: ['_id'],
            findByIdAndUpdate: ['_id', 'updatedKeys'],
            findByIdAndDelete: ['_id'],
            findOne: ['classKeys'],
            findOneAndUpdate: ['classKeys', 'updatedKeys'],
            findOneAndDelete: ['classKeys'],
        }
        static setupModel(ModelType) {
            for (const method in ModelType.queryMethodMap) {
                ModelType[method] = function(...args) {
                    if (Model.queryMethodMap[method].length === 1) {
                        const res = Model[method](args[0]);
                        return instantiateRes(res);
                    }
                    if (Model.queryMethodMap[method].length === 2) {
                        const res = Model[method](args[0], args[1]);
                        return instantiateRes(res);
                    }
                    function instantiateRes(res) {
                        if (Array.isArray(res)) {
                            for (let i = 0; i < res.length; i++) {
                                const model = new ModelType().fromJson(res[i]);
                                res[i] = model;
                            }
                            return res;
                        }
                        if (res) {
                            const model = new ModelType().fromJson(res);
                            res = model;
                            return res;
                        }
                        return res;
                    }
                }
            }
        }
        fromJson(data) {
            for (let key in data) {
                this[key] = data[key];
            }
            return this;
        }
        // READ
        static findById(_id) {
            if (!_id) return null;
            const dataCollection = Model.DB.read();
            if (typeof dataCollection === 'string') return null;
            const data = dataCollection.filter(data => data._id === _id)[0];
            if (!data) return null;
            return data;
        }
        static find(classKeys) {
            // fetch data
            const dataCollection = Model.DB.read();

            // guard clause if DB doesn't exist
            if (typeof dataCollection === 'string') return null;

            // filter data
            const filteredData = [];
            dataCollection.map(data => {

                // track state of equivalency between classKeys & data keys
                const keyTracker = {};
                for (let key in classKeys) {
                    const keyVal = classKeys[key];
                    // if classKey is defined, check equivalency of value
                    if (keyVal !== undefined) {
                        if (keyVal === data[key]) {
                            keyTracker[key] = true;
                        } else {
                            keyTracker[key] = false;
                        }
                    // else default to true (so it doesn't effect filtering)
                    } else {
                        keyTracker[key] = true;
                    }
                }

                // evaluate equivalency
                let isEquivalent = true;
                for (let key in keyTracker) {
                    const keyVal = keyTracker[key];
                    if (!keyVal) {
                        isEquivalent = false;
                    }
                }
                
                // if equivalent, pass data through filter
                if (isEquivalent) filteredData.push(data);

            });

            // if (classKeys && filteredData.length === 0) return null;
            return filteredData;
        }
        static findOne(classKeys) {
            const data = Model.find(classKeys);
            if (!data) return data;
            if (data.length > 0) return data[0];
            if (data.length === 0) return null;
        }
        // UPDATE
        static findByIdAndUpdate(_id, updatedKeys) {
            const data = Model.findById(_id);
            if (data === null) return null;
            for (let key in updatedKeys) {
                if (key === '_id' || key === 'createdAt') {
                    // do nothing
                } else {
                    data[key] = updatedKeys[key];
                }
            }
            return Model.DB.update(_id, data);
        }
        static findOneAndUpdate(classKeys, updatedKeys) {
            if (!classKeys) return null;
            const data = Model.findOne(classKeys);
            if (data === null) return null;
            for (let key in updatedKeys) {
                if (key === '_id' || key === 'createdAt') {
                    // do nothing
                } else {
                    data[key] = updatedKeys[key];
                }
            }
            return Model.DB.update(data._id, data);
        }
        // DELETE
        static findByIdAndDelete(_id) {
            return Model.DB.delete(_id);
        }
        static findOneAndDelete(classKeys) {
            if (classKeys === undefined) return null;
            const data = Model.findOne(classKeys);
            if (data === null) return Model.DB.delete('null');
            return Model.DB.delete(data._id);
        } 
        // Create
        save() {
            return Model.DB.create(this);
        }
    }
    return Model;

    function uid() {
        const uid = Date.now().toString(36) +
            Math.random().toString(36).substring(2).padStart(12, 0);
            
        return uid;
    }
}

module.exports = createModel;