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
    DELETE_SUCCESSFUL,
    NO_ID,
    INPUT_IS_INVALID,
} from './import.js';

const collectionId = getCollectionId();

async function setupCollection() {
    await documentController.instantiateCollection({ collectionId });
    fillDb();
}

describe('DELETE', () => {
    describe('Happy path', () => {
        beforeEach(async () => await setupCollection());
        afterEach(() => cleanDatabase);

        it('Deletes correct document with accurate values in database', async () => {
            const doc = getTargetDoc();
            const { _id } = doc;
            await documentController.deleteDocument({ collectionId, _id });
            expect(dbHas(doc)).toBe(false);
        });
        it('Returns successful Result object', async () => {
            const doc = getTargetDoc();
            const { _id } = doc;
            const res = await documentController.deleteDocument({
                collectionId,
                _id,
            });
            expect(isResultObject(res)).toBe(true);
        });
        it('Returns Result object with delete successful message', async () => {
            const doc = getTargetDoc();
            const { _id } = doc;
            const res = await documentController.deleteDocument({
                collectionId,
                _id,
            });
            expect(res.message).toBe(DELETE_SUCCESSFUL);
        });
    });

    describe('Sad path :(', () => {
        it('Returns input is invalid message if input is invalid', async () => {
            await setupCollection();
            const { _id } = getTargetDoc();

            const invalidCollectionIds = types.filter(
                (type) => typeof type !== 'string',
            );
            const invalidIds = types.filter((type) => typeof type !== 'string');

            for (const collectionId of invalidCollectionIds) {
                const res = await documentController.deleteDocument({
                    collectionId,
                    _id,
                });
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }

            for (const _id of invalidIds) {
                const res = await documentController.deleteDocument({
                    collectionId,
                    _id,
                });
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
            const res = await documentController.deleteDocument({
                collectionId,
                _id: '',
            });
            expect(res.message).toBe(NO_ID);
            expect(res.success).toBe(false);
        });
    });
});
