import {
    cleanDatabase,
    fileExists,
    getCollectionId,
    isResultObject,
} from './__utils__/automate.js';
import {
    Operation,
    documentController,
    DB_ALREADY_EXISTS,
    INSTANTIATION_SUCCESSFUL,
} from './import.js';

const collectionId = getCollectionId();

describe('INSTANTIATE', () => {
    describe('Happy path', () => {
        afterEach(() => cleanDatabase());

        it('Creates a file named after collection id', async () => {
            const operation = new Operation({
                type: Operation.types.INSTANTIATE_COLLECTION,
                collectionId,
                payload: {},
            });
            await documentController.instantiateCollection(operation);
            expect(fileExists()).toBe(true);
        });
        it('Returns successful Result object', async () => {
            const operation = new Operation({
                type: Operation.types.INSTANTIATE_COLLECTION,
                collectionId,
                payload: {},
            });
            const res =
                await documentController.instantiateCollection(operation);
            expect(isResultObject(res)).toBe(true);
        });
        it('Returns Result object with instantiation successful message', async () => {
            const operation = new Operation({
                type: Operation.types.INSTANTIATE_COLLECTION,
                collectionId,
                payload: {},
            });
            const res =
                await documentController.instantiateCollection(operation);
            expect(res.message).toBe(INSTANTIATION_SUCCESSFUL);
        });
    });

    describe('Sad path :(', () => {
        afterEach(() => cleanDatabase());

        it('Returns database exists message if file with collection id already exists', async () => {
            const operation = new Operation({
                type: Operation.types.INSTANTIATE_COLLECTION,
                collectionId,
                payload: {},
            });
            await documentController.instantiateCollection(operation);
            const res =
                await documentController.instantiateCollection(operation);

            expect(res.message).toBe(DB_ALREADY_EXISTS);
        });
    });
});
