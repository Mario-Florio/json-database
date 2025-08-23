import Schema from '../core/entities/Schema.js';
import documentController from '../adapters/controllers/DocumentController.js';
import getStubController from './__utils__/StubController.js';
import { uid, instantiateRes } from './__utils__/ModelHelpers.js';

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

    class Model {
        constructor() {
            this._id = uid();
            this.createdAt = new Date().toString();
        }
        // SETUP QUERY RETURNS
        static setupModel(SubModel) {
            for (const method in queryMethodMap) {
                SubModel[method] = async (...args) => {
                    const response = await Model[method](...args);
                    return instantiateRes(response, SubModel);
                }
            }
        }
        // READ
        static async findById(_id) {
            if (!idIsValid(_id)) return null;

            await controller.instantiateCollection({ collectionId });

            const response = await controller.getOneDocument({
                collectionId, 
                keys: { _id: _id }
            });

            if (response.success === false) return null;
            const document = response.data;

            return document;
        }
        static async find(classKeys) {

            await controller.instantiateCollection({ collectionId });

            const response = await controller.getDocuments({
                collectionId,
                keys: classKeys || {}
            });

            if (response.success === false) return null;
            const documents = response.data;

            return documents;
        }
        static async findOne(classKeys) {
            if (!keysAreValid(classKeys)) return null;

            await controller.instantiateCollection({ collectionId });

            const response = await controller.getOneDocument({
                collectionId, 
                keys: classKeys
            });

            if (response.success === false) return null;
            const document = response.data;

            return document;
        }
        // UPDATE
        static async findByIdAndUpdate(_id, updatedKeys) {
            if (!keysAreValid(updatedKeys)) return null;

            await controller.instantiateCollection({ collectionId });

            const document = await Model.findById(_id);

            if (!document) return null;

            const response = await controller.updateDocument({
                collectionId,
                _id,
                schema,
                data: document,
                updatedKeys
            });

            return response;
        }
        static async findOneAndUpdate(classKeys, updatedKeys) {
            if (!keysAreValid(classKeys)) return null;
            if (!keysAreValid(updatedKeys)) return null;

            await controller.instantiateCollection({ collectionId });

            const document = await Model.findOne(classKeys);

            if (!document) return null;

            const response = await controller.updateDocument({
                collectionId,
                _id: document._id,
                schema,
                data: document,
                updatedKeys
            });

            return response;
        }
        // DELETE
        static async findByIdAndDelete(_id) {
            if (!idIsValid(_id)) return null;

            await controller.instantiateCollection({ collectionId });

            const response = await controller.deleteDocument({ collectionId, _id });
            
            return response;
        }
        static async findOneAndDelete(classKeys) {
            if (!keysAreValid(classKeys)) return null;

            await documentController.instantiateCollection({ collectionId });

            const document = await Model.findOne(classKeys);
            if (!document) return { message: 'Item was not found' };

            const response = await controller.deleteDocument({
                collectionId,
                _id: document._id
            })

            return response;
        } 
        // CREATE
        async save() {
            await controller.instantiateCollection({ collectionId });

            const response = await controller.createDocument({
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

export default {
    Schema,
    model
};