import {
    types,
    getCollectionId,
    fillDb,
    dbHas,
    isResultObject,
    isDocument,
    cleanDatabase
} from './__utils__/automate.js';
import {
    documentController,
    isObject,
    READ_SUCCESSFUL,
    INPUT_IS_INVALID
} from './import.js';

const collectionId = getCollectionId();
const keys = {}
const amount = 10;

describe('GET ONE', () => {

    describe('Happy path', () => {

        beforeAll(async () => {
            await documentController.instantiateCollection({ collectionId });
            fillDb({ amount });
        });

        afterAll(() => cleanDatabase());

        it('Returns a Document', async () => {
            const res = await documentController.getOneDocument({ collectionId, keys });
            expect(isDocument(res.data)).toBe(true);
        });
        it('Returns successful Result object', async () => {
            const res = await documentController.getOneDocument({ collectionId, keys });
            expect(isResultObject(res)).toBe(true);
        });
        it('Returns Result object with read successful message', async () => {
            const res = await documentController.getOneDocument({ collectionId, keys });
            expect(res.message).toBe(READ_SUCCESSFUL);
        });

        it('Returned Document corresponds to given keys', async () => {

            const targetDocProp = 'Document 5'; // Number must be within range of 0 and (amount-1)
            const res = await documentController.getOneDocument({ collectionId, keys: { prop: targetDocProp } });

            expect(res.data.prop).toBe(targetDocProp);
            expect(dbHas(res.data)).toBe(true);

        });

    });

    describe('Sad path :(', () => {
        it('Returns input is invalid message if input is invalid', async () => {

            const invalidCollectionIds = types.filter(type => typeof type !== 'string');
            const invalidKeys = types.filter(type => !isObject(type));

            for (const collectionId of invalidCollectionIds) {
                const res = await documentController.getOneDocument({ collectionId, keys });
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }

            for (const keys of invalidKeys) {
                const res = await documentController.getOneDocument({ collectionId, keys });
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }

        });
    });
});
