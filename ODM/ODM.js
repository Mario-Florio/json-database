const documentController = require('../adapters/controllers/DocumentController.js');
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
    const collectionId = collectionName;

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

            const document = documentController.getOneDocument({
                collectionId, 
                keys: { _id: _id }
            });

            return document;
        }
        static find(classKeys) {
            const documents = documentController.getDocuments({
                collectionId,
                keys: classKeys
            });

            return documents;
        }
        static findOne(classKeys) {
            if (!keysAreValid(classKeys)) return null;

            const document = documentController.getOneDocument({
                collectionId, 
                keys: classKeys
            });;

            return document;
        }
        // UPDATE
        static findByIdAndUpdate(_id, updatedKeys) {
            if (!keysAreValid(updatedKeys)) return null;

            const doc = Model.findById(_id);

            if (!doc) return null;
            const updatedDoc = mergeKeys(doc, updatedKeys);

            const response = documentController.updateDocument({
                collectionId,
                _id,
                updatedKeys: updatedDoc
            });

            return response;
        }
        static findOneAndUpdate(classKeys, updatedKeys) {
            if (!keysAreValid(classKeys)) return null;
            if (!keysAreValid(updatedKeys)) return null;

            const document = Model.findOne(classKeys);

            if (!document) return null;
            const updatedDoc = mergeKeys(document, updatedKeys);

            const response = documentController.updateDocument({
                collectionId,
                _id: document._id,
                updatedKeys: updatedDoc
            });

            return response;
        }
        // DELETE
        static findByIdAndDelete(_id) {
            if (!idIsValid(_id)) return null;

            const response = documentController.deleteDocument({ collectionId, _id });
            
            return response;
        }
        static findOneAndDelete(classKeys) {
            if (!keysAreValid(classKeys)) return null;

            const doc = Model.findOne(classKeys);
            if (!doc) return { message: 'Item was not found' };

            const response = documentController.deleteDocument({
                collectionId,
                _id: doc._id
            })

            return response;
        } 
        // CREATE
        save() {
            const response = documentController.createDocument({
                collectionId,
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

module.exports = createModel;