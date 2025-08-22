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
    it, assert
} from './import.js';

const collectionId = getCollectionId();
const schema = getSchema();
const updatedKeys = { prop: 'This prop has been updated' }

function setupCollection() {
    documentController.instantiateCollection({ collectionId });
    fillDb();
}

console.log(`----UPDATE----`);
// Happy path
((cleanupFn) => {

    setupCollection();
    const data = getTargetDoc();
    const { _id } = data;
    const res = documentController.updateDocument({ collectionId, _id, schema, data, updatedKeys });

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

it('Returns input is invalid message if input is invalid', () => {

    setupCollection();
    const data = getTargetDoc();
    const { _id } = data;

    const invalidCollectionIds = types.filter(type => typeof type !== 'string');
    const invalidIds = types.filter(type => typeof type !== 'string');
    const invalidSchemas = types;
    const invalidDatas = types.filter(type => !isObject(type));
    const invalidKeys = types.filter(type => !isObject(type));

    for (const collectionId of invalidCollectionIds) {
        const res = documentController.updateDocument({ collectionId, _id, schema, data, updatedKeys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const _id of invalidIds) {
        const res = documentController.updateDocument({ collectionId, _id, schema, data, updatedKeys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const schema of invalidSchemas) {
        const res = documentController.updateDocument({ collectionId, _id, schema, data, updatedKeys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const data of invalidDatas) {
        const res = documentController.updateDocument({ collectionId, _id, schema, data, updatedKeys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const updatedKeys of invalidKeys) {
        const res = documentController.updateDocument({ collectionId, _id, schema, data, updatedKeys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

}, cleanDatabase);

it('Returns database doesn\'t exist message if database file hasn\'t been instantiated', () => {
    
    const res = documentController.updateDocument({ collectionId, _id: '_id', schema, data: {}, updatedKeys });
    assert(res.message === DB_DOESNT_EXIST);
    assert(res.success === false);

}, cleanDatabase);

// Edge cases
it('Returns database no-id-given message if _id is an empty string', () => {
    
    setupCollection();
    const res = documentController.updateDocument({ collectionId, _id: '', schema, data: {}, updatedKeys });
    assert(res.message === NO_ID);
    assert(res.success === false);

}, cleanDatabase);
