import {
    types,
    getCollectionId,
    fillDb,
    dbHas,
    isResultObject,
    isDocument,
    cleanDatabase,
} from './__utils__/automate.js';
import {
    documentController,
    Operation,
    isObject,
    READ_SUCCESSFUL,
    INPUT_IS_INVALID,
} from './import.js';

const collectionId = getCollectionId();
const keys = {};
const amount = 10;

describe('GET', () => {
    describe('Happy path', () => {
        beforeAll(async () => {
            const operation = new Operation({
                type: Operation.types.INSTANTIATE_COLLECTION,
                collectionId,
                payload: {},
            });
            await documentController.instantiateCollection(operation);
            fillDb({ amount });
        });

        afterAll(() => cleanDatabase());

        it('Returns array of Documents', async () => {
            const operation = new Operation({
                type: Operation.types.GET_DOCUMENTS,
                collectionId,
                payload: { keys },
            });
            const res = await documentController.getDocuments(operation);
            expect(Array.isArray(res.data)).toBe(true);
            expect(res.data.every((doc) => isDocument(doc))).toBe(true);
        });
        it('Array of Documents is accurate', async () => {
            const operation = new Operation({
                type: Operation.types.GET_DOCUMENTS,
                collectionId,
                payload: { keys },
            });
            const res = await documentController.getDocuments(operation);
            expect(res.data.every((doc) => dbHas(doc))).toBe(true);
        });
        it('Returns successful Result object', async () => {
            const operation = new Operation({
                type: Operation.types.GET_DOCUMENTS,
                collectionId,
                payload: { keys },
            });
            const res = await documentController.getDocuments(operation);
            expect(isResultObject(res)).toBe(true);
        });
        it('Returns Result object with read successful message', async () => {
            const operation = new Operation({
                type: Operation.types.GET_DOCUMENTS,
                collectionId,
                payload: { keys },
            });
            const res = await documentController.getDocuments(operation);
            expect(res.message).toBe(READ_SUCCESSFUL);
        });

        it('Returns only accurate Documents if given keys', async () => {
            const targetDocProp = 'Document 9'; // Number must be within range of 0 and (amount-1)
            const operation = new Operation({
                type: Operation.types.GET_DOCUMENTS,
                collectionId,
                payload: {
                    keys: { prop: targetDocProp },
                },
            });
            const filteredRes =
                await documentController.getDocuments(operation);

            expect(filteredRes.data.length > 0).toBe(true);
            expect(
                filteredRes.data.every((doc) => doc.prop === targetDocProp),
            ).toBe(true);
            expect(filteredRes.data.every((doc) => dbHas(doc))).toBe(true);
        });
    });

    describe('Sad path :(', () => {
        it('Returns input is invalid message if input is invalid', async () => {
            const invalidKeys = types.filter((type) => !isObject(type));

            for (const keys of invalidKeys) {
                const operation = new Operation({
                    type: Operation.types.GET_DOCUMENTS,
                    collectionId,
                    payload: { keys },
                });
                const res = await documentController.getDocuments(operation);
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }
        });
    });
});
