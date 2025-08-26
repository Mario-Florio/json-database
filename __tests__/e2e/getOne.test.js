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
    INPUT_IS_INVALID,
    it, itAsync, assert
} from './import.js';

const collectionId = getCollectionId();
const keys = {}
const amount = 10;

console.log(`----GET_ONE----`);
// Happy path
await (async (cleanupFn) => {

    await documentController.instantiateCollection({ collectionId });
    fillDb({ amount });
    const res = await documentController.getOneDocument({ collectionId, keys });

    it('Returns a Document', () => {
        assert(isDocument(res.data));
    });
    it('Returns successful Result object', () => {
        assert(isResultObject(res));
    });
    it('Returns Result object with read successful message', () => {
        assert(res.message === READ_SUCCESSFUL);
    });

    await itAsync('Returned Document corresponds to given keys', async () => {

        const targetDocProp = 'Document 5'; // Number must be within range of 0 and (amount-1)
        const res = await documentController.getOneDocument({ collectionId, keys: { prop: targetDocProp } });

        assert(res.data.prop === targetDocProp);
        assert(dbHas(res.data));

    });

    cleanupFn();

})(cleanDatabase);

await itAsync('Returns input is invalid message if input is invalid', async () => {

    const invalidCollectionIds = types.filter(type => typeof type !== 'string');
    const invalidKeys = types.filter(type => !isObject(type));

    for (const collectionId of invalidCollectionIds) {
        const res = await documentController.getOneDocument({ collectionId, keys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const keys of invalidKeys) {
        const res = await documentController.getOneDocument({ collectionId, keys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

}, cleanDatabase);
