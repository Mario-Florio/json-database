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
    DB_DOESNT_EXIST,
    READ_SUCCESSFUL,
    INPUT_IS_INVALID,
    it, assert
} from './import.js';

const collectionId = getCollectionId();
const keys = {}
const amount = 10;

console.log(`----GET----`);
// Happy path
((cleanupFn) => {

    documentController.instantiateCollection({ collectionId });
    fillDb({ amount });
    const res = documentController.getDocuments({ collectionId, keys });

    it('Returns array of Documents', () => {
        assert(Array.isArray(res.data));
        assert(res.data.every(doc => isDocument(doc)));
    });
    it('Array of Documents is accurate', () => {
        assert(res.data.every(doc => dbHas(doc)));
    });
    it('Returns successful Result object', () => {
        assert(isResultObject(res));
    });
    it('Returns Result object with read successful message', () => {
        assert(res.message === READ_SUCCESSFUL);
    });

    it('Returns only accurate Documents if given keys', () => {

        const targetDocProp = 'Document 9'; // Number must be within range of 0 and (amount-1)
        const filteredRes = documentController.getDocuments({ collectionId, keys: { prop: targetDocProp } });

        assert(filteredRes.data.length > 0);
        assert(filteredRes.data.every(doc => doc.prop === targetDocProp));
        assert(filteredRes.data.every(doc => doc._id !== undefined && doc.createdAt !== undefined));
        assert(filteredRes.data.every(doc => dbHas(doc)));

    });

    cleanupFn();

})(cleanDatabase);

it('Returns input is invalid message if input is invalid', () => {

    const invalidCollectionIds = types.filter(type => typeof type !== 'string');
    const invalidKeys = types.filter(type => !isObject(type));

    for (const collectionId of invalidCollectionIds) {
        const res = documentController.getDocuments({ collectionId, keys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const keys of invalidKeys) {
        const res = documentController.getDocuments({ collectionId, keys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

}, cleanDatabase);

it('Returns database doesn\'t exist message if database file hasn\'t been instantiated', () => {

    const res = documentController.getDocuments({ collectionId, keys });
    assert(res.message === DB_DOESNT_EXIST);
    assert(res.success === false);

}, cleanDatabase);
