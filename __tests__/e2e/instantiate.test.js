import {
    types,
    getCollectionId,
    fileExists,
    isResultObject,
    cleanDatabase
} from './__utils__/automate.js';
import {
    documentController,
    INSTANTIATION_SUCCESSFUL,
    INPUT_IS_INVALID,
    DB_ALREADY_EXISTS,
    it, itAsync, assert
} from './import.js';

const collectionId = getCollectionId();

console.log(`----INSTANTIATE----`);
// Happy path
await (async (cleanupFn) => {

    const res = await documentController.instantiateCollection({ collectionId });

    it('Creates a file named after collection id', () => {
        assert(fileExists());
    });
    it('Returns successful Result object', () => {
        assert(isResultObject(res));
    });
    it('Returns Result object with instantiation successful message', () => {
        assert(res.message === INSTANTIATION_SUCCESSFUL);
    });
    cleanupFn();

})(cleanDatabase);

await itAsync('Returns input is invalid message if collectionId is invalid', async () => {

    const invalidCollectionIds = types.filter(type => typeof type !== 'string');

    for (const collectionId of invalidCollectionIds) {
        const res = await documentController.instantiateCollection({ collectionId });
        assert(res.message === INPUT_IS_INVALID);
    }

}, cleanDatabase);
await itAsync('Returns database exists message if file with collection id already exists', async () => {

    await documentController.instantiateCollection({ collectionId });
    const res = await documentController.instantiateCollection({ collectionId });

    assert(res.message === DB_ALREADY_EXISTS);

}, cleanDatabase);
