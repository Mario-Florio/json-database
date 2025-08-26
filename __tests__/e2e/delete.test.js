import {
    types,
    getCollectionId,
    getTargetDoc,
    fillDb,
    dbHas,
    isResultObject,
    cleanDatabase
} from './__utils__/automate.js';
import {
    documentController,
    DELETE_SUCCESSFUL,
    NO_ID,
    INPUT_IS_INVALID,
    it, itAsync, assert
} from './import.js';

const collectionId = getCollectionId();

async function setupCollection() {
    await documentController.instantiateCollection({ collectionId });
    fillDb();
}

console.log(`----DELETE----`);
// Happy path
await (async (cleanupFn) => {

    await setupCollection();
    const doc = getTargetDoc();
    const { _id } = doc;
    const res = await documentController.deleteDocument({ collectionId, _id });

    it('Deletes correct document with accurate values in database', () => {

        assert(!dbHas(doc));

    }, false, { logErr: true });
    it('Returns successful Result object', () => {
        assert(isResultObject(res));
    });
    it('Returns Result object with delete successful message', () => {
        assert(res.message === DELETE_SUCCESSFUL);
    });
    cleanupFn();

})(cleanDatabase);

await itAsync('Returns input is invalid message if input is invalid', async () => {

    await setupCollection();
    const { _id } = getTargetDoc();

    const invalidCollectionIds = types.filter(type => typeof type !== 'string');
    const invalidIds = types.filter(type => typeof type !== 'string');

    for (const collectionId of invalidCollectionIds) {
        const res = await documentController.deleteDocument({ collectionId, _id });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const _id of invalidIds) {
        const res = await documentController.deleteDocument({ collectionId, _id });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

}, cleanDatabase);

// Edge cases
await itAsync('Returns database no-id-given message if _id is an empty string', async () => {
    
    await setupCollection();
    const res = await documentController.deleteDocument({ collectionId, _id: '' });
    assert(res.message === NO_ID);
    assert(res.success === false);

}, cleanDatabase);
