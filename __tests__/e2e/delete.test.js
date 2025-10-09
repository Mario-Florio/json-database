import {
    types,
    getCollectionId,
    getTargetDoc,
    fillDb,
    dbHas,
    isResultObject,
    cleanDatabase,
} from './__utils__/automate.js';
import {
    documentController,
    Operation,
    DELETE_SUCCESSFUL,
    NO_ID,
    INPUT_IS_INVALID,
} from './import.js';

const collectionId = getCollectionId();

async function setupCollection() {
    const operation = new Operation({
        type: Operation.types.INSTANTIATE_COLLECTION,
        collectionId,
        payload: {},
    });
    await documentController.instantiateCollection(operation);
    fillDb();
}

describe('DELETE', () => {
    describe('Happy path', () => {
        beforeEach(async () => await setupCollection());
        afterEach(() => cleanDatabase);

        it('Deletes correct document with accurate values in database', async () => {
            const doc = getTargetDoc();
            const { _id } = doc;
            const operation = new Operation({
                type: Operation.types.DELETE_DOCUMENT,
                collectionId,
                payload: { _id },
            });
            await documentController.deleteDocument(operation);
            expect(dbHas(doc)).toBe(false);
        });
        it('Returns successful Result object', async () => {
            const doc = getTargetDoc();
            const { _id } = doc;
            const operation = new Operation({
                type: Operation.types.DELETE_DOCUMENT,
                collectionId,
                payload: { _id },
            });
            const res = await documentController.deleteDocument(operation);
            expect(isResultObject(res)).toBe(true);
        });
        it('Returns Result object with delete successful message', async () => {
            const doc = getTargetDoc();
            const { _id } = doc;
            const operation = new Operation({
                type: Operation.types.DELETE_DOCUMENT,
                collectionId,
                payload: { _id },
            });
            const res = await documentController.deleteDocument(operation);
            expect(res.message).toBe(DELETE_SUCCESSFUL);
        });
    });

    describe('Sad path :(', () => {
        it('Returns input is invalid message if input is invalid', async () => {
            await setupCollection();
            const { _id } = getTargetDoc();

            const invalidIds = types.filter((type) => typeof type !== 'string');

            for (const _id of invalidIds) {
                const operation = new Operation({
                    type: Operation.types.DELETE_DOCUMENT,
                    collectionId,
                    payload: { _id },
                });
                const res = await documentController.deleteDocument(operation);
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }
        });
    });

    describe('Edge cases', () => {
        beforeEach(async () => await setupCollection());
        afterEach(() => cleanDatabase());

        it('Returns database no-id-given message if _id is an empty string', async () => {
            await setupCollection();
            const operation = new Operation({
                type: Operation.types.DELETE_DOCUMENT,
                collectionId,
                payload: { _id: '' },
            });
            const res = await documentController.deleteDocument(operation);
            expect(res.message).toBe(NO_ID);
            expect(res.success).toBe(false);
        });
    });
});
