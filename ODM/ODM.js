const Schema = require('../core/entities/Schema.js');
const documentController = require('../adapters/controllers/DocumentController.js');
const getStubController = require('./__utils__/StubController.js');
const { uid, instantiateRes } = require('./__utils__/ModelHelpers.js');

const stubController = getStubController();

const queryMethodMap = {
    //method: parameters
        find: ['classKeys'],
    findById: ['_id'],
     findOne: ['classKeys']
};

function model(collectionName, schema, stub = false) {
    const collectionId = collectionName;
    const controller = stub ? stubController : documentController;

    documentController.instantiateCollection({ collectionId });

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

            const document = controller.getOneDocument({
                collectionId, 
                keys: { _id: _id }
            });

            return document;
        }
        static find(classKeys) {
            const documents = controller.getDocuments({
                collectionId,
                keys: classKeys
            });

            return documents;
        }
        static findOne(classKeys) {
            if (!keysAreValid(classKeys)) return null;

            const document = controller.getOneDocument({
                collectionId, 
                keys: classKeys
            });;

            return document;
        }
        // UPDATE
        static findByIdAndUpdate(_id, updatedKeys) {
            if (!keysAreValid(updatedKeys)) return null;

            const document = Model.findById(_id);

            if (!document) return null;

            const response = controller.updateDocument({
                collectionId,
                _id,
                schema,
                data: document,
                updatedKeys
            });

            return response;
        }
        static findOneAndUpdate(classKeys, updatedKeys) {
            if (!keysAreValid(classKeys)) return null;
            if (!keysAreValid(updatedKeys)) return null;

            const document = Model.findOne(classKeys);

            if (!document) return null;

            const response = controller.updateDocument({
                collectionId,
                _id: document._id,
                schema,
                data: document,
                updatedKeys
            });

            return response;
        }
        // DELETE
        static findByIdAndDelete(_id) {
            if (!idIsValid(_id)) return null;

            const response = controller.deleteDocument({ collectionId, _id });
            
            return response;
        }
        static findOneAndDelete(classKeys) {
            if (!keysAreValid(classKeys)) return null;

            const document = Model.findOne(classKeys);
            if (!document) return { message: 'Item was not found' };

            const response = controller.deleteDocument({
                collectionId,
                _id: document._id
            })

            return response;
        } 
        // CREATE
        save() {
            const response = controller.createDocument({
                collectionId,
                schema,
                data: this
            });

            return response;
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

module.exports = {
    Schema,
    model
};