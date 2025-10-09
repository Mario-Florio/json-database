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

describe('GET ONE', () => {
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

        it('Returns a Document', async () => {
            const operation = new Operation({
                type: Operation.types.GET_ONE_DOCUMENT,
                collectionId,
                payload: { keys },
            });
            const res = await documentController.getOneDocument(operation);
            expect(isDocument(res.data)).toBe(true);
        });
        it('Returns successful Result object', async () => {
            const operation = new Operation({
                type: Operation.types.GET_ONE_DOCUMENT,
                collectionId,
                payload: { keys },
            });
            const res = await documentController.getOneDocument(operation);
            expect(isResultObject(res)).toBe(true);
        });
        it('Returns Result object with read successful message', async () => {
            const operation = new Operation({
                type: Operation.types.GET_ONE_DOCUMENT,
                collectionId,
                payload: { keys },
            });
            const res = await documentController.getOneDocument(operation);
            expect(res.message).toBe(READ_SUCCESSFUL);
        });

        it('Returned Document corresponds to given keys', async () => {
            const targetDocProp = 'Document 5'; // Number must be within range of 0 and (amount-1)
            const operation = new Operation({
                type: Operation.types.GET_ONE_DOCUMENT,
                collectionId,
                payload: {
                    keys: { prop: targetDocProp },
                },
            });
            const res = await documentController.getOneDocument(operation);

            expect(res.data.prop).toBe(targetDocProp);
            expect(dbHas(res.data)).toBe(true);
        });
    });

    describe('Sad path :(', () => {
        it('Returns input is invalid message if input is invalid', async () => {
            const invalidKeys = types.filter((type) => !isObject(type));

            for (const keys of invalidKeys) {
                const operation = new Operation({
                    type: Operation.types.GET_ONE_DOCUMENT,
                    collectionId,
                    payload: { keys },
                });
                const res = await documentController.getOneDocument(operation);
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }
        });
    });
});
