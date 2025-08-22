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
    DB_DOESNT_EXIST,
    INPUT_IS_INVALID,
    it, assert
} from './import.js';

const collectionId = getCollectionId();

function setupCollection() {
    documentController.instantiateCollection({ collectionId });
    fillDb();
}

console.log(`----DELETE----`);
// Happy path
((cleanupFn) => {

    setupCollection();
    const doc = getTargetDoc();
    const { _id } = doc;
    const res = documentController.deleteDocument({ collectionId, _id });

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

it('Returns input is invalid message if input is invalid', () => {

    setupCollection();
    const { _id } = getTargetDoc();

    const invalidCollectionIds = types.filter(type => typeof type !== 'string');
    const invalidIds = types.filter(type => typeof type !== 'string');

    for (const collectionId of invalidCollectionIds) {
        const res = documentController.deleteDocument({ collectionId, _id });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const _id of invalidIds) {
        const res = documentController.deleteDocument({ collectionId, _id });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

}, cleanDatabase);

it('Returns database doesn\'t exist message if database file hasn\'t been instantiated', () => {
    
    const res = documentController.deleteDocument({ collectionId, _id: '_id' });
    assert(res.message === DB_DOESNT_EXIST);
    assert(res.success === false);

}, cleanDatabase);

// Edge cases
it('Returns database no-id-given message if _id is an empty string', () => {
    
    setupCollection();
    const res = documentController.deleteDocument({ collectionId, _id: '' });
    assert(res.message === NO_ID);
    assert(res.success === false);

}, cleanDatabase);
