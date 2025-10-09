import {
    types,
    getCollectionId,
    getSchema,
    getTargetDoc,
    fillDb,
    dbHas,
    isResultObject,
    cleanDatabase,
} from './__utils__/automate.js';
import {
    documentController,
    Operation,
    isObject,
    UPDATE_SUCCESSFUL,
    NO_ID,
    INPUT_IS_INVALID,
} from './import.js';

const collectionId = getCollectionId();
const schema = getSchema();
const updatedKeys = { prop: 'This prop has been updated' };

async function setupCollection() {
    const operation = new Operation({
        type: Operation.types.INSTANTIATE_COLLECTION,
        collectionId,
        payload: {},
    });
    await documentController.instantiateCollection(operation);
    fillDb();
}

describe('UPDATE', () => {
    describe('Happy path', () => {
        beforeEach(async () => await setupCollection());
        afterEach(() => cleanDatabase());

        it('Updates correct document with accurate values in database', async () => {
            const data = getTargetDoc();
            const { _id } = data;
            const operation = new Operation({
                type: Operation.types.UPDATE_DOCUMENT,
                collectionId,
                payload: { _id, schema, data, updatedKeys },
            });
            await documentController.updateDocument(operation);

            const updatedDoc = {};
            for (const key of Object.keys(data)) {
                updatedDoc[key] = updatedKeys[key]
                    ? updatedKeys[key]
                    : data[key];
            }

            expect(dbHas(updatedDoc)).toBe(true);
        });
        it('Returns successful Result object', async () => {
            const data = getTargetDoc();
            const { _id } = data;
            const operation = new Operation({
                type: Operation.types.UPDATE_DOCUMENT,
                collectionId,
                payload: { _id, schema, data, updatedKeys },
            });
            const res = await documentController.updateDocument(operation);
            expect(isResultObject(res)).toBe(true);
        });
        it('Returns Result object with update successful message', async () => {
            const data = getTargetDoc();
            const { _id } = data;
            const operation = new Operation({
                type: Operation.types.UPDATE_DOCUMENT,
                collectionId,
                payload: { _id, schema, data, updatedKeys },
            });
            const res = await documentController.updateDocument(operation);
            expect(res.message).toBe(UPDATE_SUCCESSFUL);
        });
    });

    describe('Sad path :(', () => {
        it('Returns input is invalid message if input is invalid', async () => {
            await setupCollection();
            const data = getTargetDoc();
            const { _id } = data;

            const invalidIds = types.filter((type) => typeof type !== 'string');
            const invalidSchemas = types;
            const invalidDatas = types.filter((type) => !isObject(type));
            const invalidKeys = types.filter((type) => !isObject(type));

            for (const _id of invalidIds) {
                const operation = new Operation({
                    type: Operation.types.UPDATE_DOCUMENT,
                    collectionId,
                    payload: { _id, schema, data, updatedKeys },
                });
                const res = await documentController.updateDocument(operation);
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }

            for (const schema of invalidSchemas) {
                const operation = new Operation({
                    type: Operation.types.UPDATE_DOCUMENT,
                    collectionId,
                    payload: { _id, schema, data, updatedKeys },
                });
                const res = await documentController.updateDocument(operation);
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }

            for (const data of invalidDatas) {
                const operation = new Operation({
                    type: Operation.types.UPDATE_DOCUMENT,
                    collectionId,
                    payload: { _id, schema, data, updatedKeys },
                });
                const res = await documentController.updateDocument(operation);
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }

            for (const updatedKeys of invalidKeys) {
                const operation = new Operation({
                    type: Operation.types.UPDATE_DOCUMENT,
                    collectionId,
                    payload: { _id, schema, data, updatedKeys },
                });
                const res = await documentController.updateDocument(operation);
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }
        });
    });

    describe('Edge cases', () => {
        beforeEach(async () => await setupCollection());
        afterEach(() => cleanDatabase());

        it('Returns database no-id-given message if _id is an empty string', async () => {
            const operation = new Operation({
                type: Operation.types.UPDATE_DOCUMENT,
                collectionId,
                payload: {
                    _id: '',
                    schema,
                    data: {},
                    updatedKeys,
                },
            });
            const res = await documentController.updateDocument(operation);
            expect(res.message).toBe(NO_ID);
            expect(res.success).toBe(false);
        });
    });
});
