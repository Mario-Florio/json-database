import documentController from '../../adapters/controllers/DocumentController.js';
import uid from '../../shared/__utils__/uid.js';
import { idIsValid, keysAreValid } from './__utils__/ModelHelpers.js';

function model(collectionName, schema) {
    const collectionId = collectionName;
    const controller = documentController;

    class Model {
        constructor(paramObj) {
            if (paramObj._id === undefined) this._id = uid();
            if (paramObj.createdAt === undefined)
                this.createdAt = new Date().toString();

            for (const key in schema)
                if (paramObj[key]) this[key] = paramObj[key];

            this.#setVirtuals(schema.getVirtuals());
        }
        // READ
        static async findById(_id) {
            if (!idIsValid(_id)) return null;

            const response = await controller.getOneDocument({
                collectionId,
                keys: { _id: _id },
            });

            if (response.success === false) return null;
            const document = response.data;

            return document && Model.#modelDocument(document);
        }
        static async find(classKeys) {
            const response = await controller.getDocuments({
                collectionId,
                keys: classKeys || {},
            });

            if (response.success === false) return null;
            const documents = response.data;

            return documents.map(
                (document) => document && Model.#modelDocument(document),
            );
        }
        static async findOne(classKeys) {
            if (!keysAreValid(classKeys)) return null;

            const response = await controller.getOneDocument({
                collectionId,
                keys: classKeys,
            });

            if (response.success === false) return null;
            const document = response.data;

            return document && Model.#modelDocument(document);
        }
        // UPDATE
        static async findByIdAndUpdate(_id, updatedKeys) {
            if (!idIsValid(_id)) return null;
            if (!keysAreValid(updatedKeys)) return null;

            const document = await Model.findById(_id);

            if (!document) return null;

            const response = await controller.updateDocument({
                collectionId,
                _id,
                schema,
                data: document,
                updatedKeys,
            });

            return response;
        }
        static async findOneAndUpdate(classKeys, updatedKeys) {
            if (!keysAreValid(classKeys)) return null;
            if (!keysAreValid(updatedKeys)) return null;

            const document = await Model.findOne(classKeys);

            if (!document) return null;

            const response = await controller.updateDocument({
                collectionId,
                _id: document._id,
                schema,
                data: document,
                updatedKeys,
            });

            return response;
        }
        // DELETE
        static async findByIdAndDelete(_id) {
            if (!idIsValid(_id)) return null;

            const response = await controller.deleteDocument({
                collectionId,
                _id,
            });

            return response;
        }
        static async findOneAndDelete(classKeys) {
            if (!keysAreValid(classKeys)) return null;

            const document = await Model.findOne(classKeys);
            if (!document) return { message: 'Item was not found' };

            const response = await controller.deleteDocument({
                collectionId,
                _id: document._id,
            });

            return response;
        }
        // CREATE
        async save() {
            const response = await controller.createDocument({
                collectionId,
                schema,
                data: this,
            });

            return response;
        }
        // UTILS
        static #modelDocument(document) {
            const model = new Model({});
            for (const key in document) {
                model[key] = document[key];
            }
            return model;
        }
        #setVirtuals(virtuals) {
            for (const virtual of virtuals) {
                Object.defineProperty(this, virtual.name, {
                    get: virtual.getFn,
                    set: virtual.setFn,
                    configurable: true,
                });
            }
        }
    }

    return Model;
}

export default model;
