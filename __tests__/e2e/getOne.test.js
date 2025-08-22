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

console.log(`----GET_ONE----`);
// Happy path
((cleanupFn) => {

    documentController.instantiateCollection({ collectionId });
    fillDb({ amount });
    const res = documentController.getOneDocument({ collectionId, keys });

    it('Returns a Document', () => {
        assert(isDocument(res.data));
    });
    it('Returns successful Result object', () => {
        assert(isResultObject(res));
    });
    it('Returns Result object with read successful message', () => {
        assert(res.message === READ_SUCCESSFUL);
    });

    it('Returned Document corresponds to given keys', () => {

        const targetDocProp = 'Document 5'; // Number must be within range of 0 and (amount-1)
        const res = documentController.getOneDocument({ collectionId, keys: { prop: targetDocProp } });

        assert(res.data.prop === targetDocProp);
        assert(res.data._id !== undefined && res.data.createdAt !== undefined);
        assert(dbHas(res.data));

    });

    cleanupFn();

})(cleanDatabase);

it('Returns input is invalid message if input is invalid', () => {

    const invalidCollectionIds = types.filter(type => typeof type !== 'string');
    const invalidKeys = types.filter(type => !isObject(type));

    for (const collectionId of invalidCollectionIds) {
        const res = documentController.getOneDocument({ collectionId, keys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const keys of invalidKeys) {
        const res = documentController.getOneDocument({ collectionId, keys });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

}, cleanDatabase);

it('Returns database doesn\'t exist message if database file hasn\'t been instantiated', () => {

    const res = documentController.getOneDocument({ collectionId, keys });
    assert(res.message === DB_DOESNT_EXIST);
    assert(res.success === false);

}, cleanDatabase);
