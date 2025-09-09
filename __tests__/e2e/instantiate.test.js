import {
    types,
    getCollectionId,
    fileExists,
    isResultObject,
    cleanDatabase,
} from './__utils__/automate.js';
import {
    documentController,
    INSTANTIATION_SUCCESSFUL,
    INPUT_IS_INVALID,
    DB_ALREADY_EXISTS,
} from './import.js';

const collectionId = getCollectionId();

describe('INSTANTIATE', () => {
    describe('Happy path', () => {
        afterEach(() => cleanDatabase());

        it('Creates a file named after collection id', async () => {
            await documentController.instantiateCollection({ collectionId });
            expect(fileExists()).toBe(true);
        });
        it('Returns successful Result object', async () => {
            const res = await documentController.instantiateCollection({
                collectionId,
            });
            expect(isResultObject(res)).toBe(true);
        });
        it('Returns Result object with instantiation successful message', async () => {
            const res = await documentController.instantiateCollection({
                collectionId,
            });
            expect(res.message).toBe(INSTANTIATION_SUCCESSFUL);
        });
    });

    describe('Sad path :(', () => {
        afterEach(() => cleanDatabase());

        it('Returns input is invalid message if collectionId is invalid', async () => {
            const invalidCollectionIds = types.filter(
                (type) => typeof type !== 'string',
            );

            for (const collectionId of invalidCollectionIds) {
                const res = await documentController.instantiateCollection({
                    collectionId,
                });

                expect(res.message).toBe(INPUT_IS_INVALID);
            }
        });

        it('Returns database exists message if file with collection id already exists', async () => {
            await documentController.instantiateCollection({ collectionId });
            const res = await documentController.instantiateCollection({
                collectionId,
            });

            console.log(res);
            expect(res.message).toBe(DB_ALREADY_EXISTS);
        });
    });
});
