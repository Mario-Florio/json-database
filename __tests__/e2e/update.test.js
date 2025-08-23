import {
    types,
    getCollectionId,
    getSchema,
    getTargetDoc,
    fillDb,
    dbHas,
    isResultObject,
    cleanDatabase
} from './__utils__/automate.js';
import {
    documentController,
    isObject,
    UPDATE_SUCCESSFUL,
    NO_ID,
    DB_DOESNT_EXIST,
    INPUT_IS_INVALID,
    it, itAsync, assert
} from './import.js';

const collectionId = getCollectionId();
const schema = getSchema();
const updatedKeys = { prop: 'This prop has been updated' }

async function setupCollection() {
    await documentController.instantiateCollection({ collectionId });
    fillDb();
}

console.log(`----UPDATE----`);
// Happy path
await (async (cleanupFn) => {

    await setupCollection();
    const data = getTargetDoc();
    const { _id } = data;
    const res = await documentController.updateDocument({ collectionId, _id, schema, data, updatedKeys });

    it('Updates correct document with accurate values in database', () => {

        const updatedDoc = {}
        for (const key of Object.keys(data)) {
            updatedDoc[key] = updatedKeys[key] ? updatedKeys[key] : data[key];
        }

        assert(dbHas(updatedDoc));

    });
    it('Returns successful Result object', () => {
        assert(isResultObject(res));
    });
    it('Returns Result object with update successful message', () => {
        assert(res.message === UPDATE_SUCCESSFUL);
    });
    cleanupFn();

})(cleanDatabase);

await itAsync('Returns input is invalid message if input is invalid', async () => {

    await setupCollection();
    const data = getTargetDoc();
    const { _id } = data;

    const invalidCollectionIds = types.filter(type => typeof type !== 'string');
    const invalidIds = types.filter(type => typeof type !== 'string');
    const invalidSchemas = types;
    const invalidDatas = types.filter(type => !isObject(type));
    const invalidKeys = types.filter(type => !isObject(type));

    for (const collectionId of invalidCollectionIds) {
        const res = await documentController.updateDocument({ collectionId, _id, schema, data, updatedKeys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const _id of invalidIds) {
        const res = await documentController.updateDocument({ collectionId, _id, schema, data, updatedKeys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const schema of invalidSchemas) {
        const res = await documentController.updateDocument({ collectionId, _id, schema, data, updatedKeys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const data of invalidDatas) {
        const res = await documentController.updateDocument({ collectionId, _id, schema, data, updatedKeys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const updatedKeys of invalidKeys) {
        const res = await documentController.updateDocument({ collectionId, _id, schema, data, updatedKeys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

}, cleanDatabase);

await itAsync('Returns database doesn\'t exist message if database file hasn\'t been instantiated', async () => {
    
    const res = await documentController.updateDocument({ collectionId, _id: '_id', schema, data: {}, updatedKeys });
    assert(res.message === DB_DOESNT_EXIST);
    assert(res.success === false);

}, cleanDatabase);

// Edge cases
await itAsync('Returns database no-id-given message if _id is an empty string', async () => {
    
    await setupCollection();
    const res = await documentController.updateDocument({ collectionId, _id: '', schema, data: {}, updatedKeys });
    assert(res.message === NO_ID);
    assert(res.success === false);

}, cleanDatabase);
