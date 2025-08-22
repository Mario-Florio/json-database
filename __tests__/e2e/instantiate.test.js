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
    it, assert
} from './import.js';

const collectionId = getCollectionId();

console.log(`----INSTANTIATE----`);
// Happy path
((cleanupFn) => {

    const res = documentController.instantiateCollection({ collectionId });

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

it('Returns input is invalid message if collectionId is invalid', () => {

    const invalidCollectionIds = types.filter(type => typeof type !== 'string');

    for (const collectionId of invalidCollectionIds) {
        const res = documentController.instantiateCollection({ collectionId });
        assert(res.message === INPUT_IS_INVALID);
    }

}, cleanDatabase);
it('Returns database exists message if file with collection id already exists', () => {

    documentController.instantiateCollection({ collectionId });
    const res = documentController.instantiateCollection({ collectionId });

    assert(res.message === DB_ALREADY_EXISTS);

}, cleanDatabase);
