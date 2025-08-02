const DB = require('../IO-API/DB.js');
const { filterCondition } = require('./__utils__/ModelHelpers.js');
const {
    uid,
    mergeKeys,
    instantiateRes
} = require('./__utils__/ModelHelpers.js');

const queryMethodMap = {
             //method: parameters
                 find: ['classKeys'],
             findById: ['_id'],
              findOne: ['classKeys'],
    findByIdAndUpdate: ['_id', 'updatedKeys'],
    findByIdAndDelete: ['_id'],
     findOneAndUpdate: ['classKeys', 'updatedKeys'],
     findOneAndDelete: ['classKeys']
};

function createModel(collectionName) {
    const db = new DB(collectionName);

    db.instantiate();

    class Model {
        constructor() {
            this._id = uid();
            this.createdAt = new Date().toString();
        }
        // SETUP QUERY RETURNS
        static setupModel(SubModel) {
            for (const method in queryMethodMap) {
                SubModel[method] = (...args) => {
                    const response = Model[method](...args);
                    return instantiateRes(response, SubModel);
                }
            }
        }
        // READ
        static findById(_id) {
            if (!idIsValid(_id)) return null;

            return Model.findOne({ _id });
        }
        static find(classKeys) {
            const dataCollection = db.read();

            const filteredData = dataCollection.filter(doc => filterCondition(doc, classKeys));

            return filteredData ?? null;
        }
        static findOne(classKeys) {
            if (!keysAreValid(classKeys)) return null;

            const dataCollection = db.read();

            const data = dataCollection.find(doc => filterCondition(doc, classKeys));

            return data ?? null;
        }
        // UPDATE
        static findByIdAndUpdate(_id, updatedKeys) {
            if (!keysAreValid(updatedKeys)) return null;

            const data = Model.findById(_id);

            if (!data) return null;
            const updatedData = mergeKeys(data, updatedKeys);

            return db.update(_id, updatedData);
        }
        static findOneAndUpdate(classKeys, updatedKeys) {
            if (!keysAreValid(classKeys)) return null;
            if (!keysAreValid(updatedKeys)) return null;

            const data = Model.findOne(classKeys);

            if (data === null) return null;
            const updatedData = mergeKeys(data, updatedKeys);

            return db.update(data._id, updatedData);
        }
        // DELETE
        static findByIdAndDelete(_id) {
            if (!idIsValid(_id)) return null;

            return db.delete(_id);
        }
        static findOneAndDelete(classKeys) {
            if (!keysAreValid(classKeys)) return null;

            const data = Model.findOne(classKeys);
            if (data === null) return { message: 'Item was not found' };

            return db.delete(data._id);
        } 
        // CREATE
        save() {
            return db.create(this);
        }
    }
    return Model;
}

function idIsValid(_id) {
    if (!_id) return false;
    if (typeof _id !== 'string') return false;
    return true;
}

function keysAreValid(keys) {
    if (keys === undefined) return false;
    if (typeof keys !== 'object' || Array.isArray(keys)) return false;
    return true;
}

module.exports = createModel;