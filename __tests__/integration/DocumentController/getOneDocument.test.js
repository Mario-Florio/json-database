import {
    instantiateCollection,
    isDocument,
    runInvalidProps,
    isValidResponse,
    cleanDatabase
} from './__utils__/automate.js';
import {
    documentController,
    GETONE,
    it, assert
} from './imports.js';

console.log('----DOCUMENT_CONTROLLER-GET_ONE_DOCUMENT----');
it('Returns single Document or null if paramObj props are valid', () => {

    const collectionId = instantiateCollection();
    const paramObj = {
        collectionId,
        keys: {}
    };

    const response = documentController.getOneDocument(paramObj);

    assert(isDocument(response.data) || response.data === null);

}, cleanDatabase);
it('Returns non-array object if paramObj props are invalid', () => {

    const collectionId = instantiateCollection();
    const paramObj = {
        collectionId,
        keys: {}
    };
    const paramObjSchema = {
        collectionId: 'string',
        keys: 'object'
    };

    const responses = runInvalidProps(GETONE, paramObj, paramObjSchema);

    assert(responses.every(response => isValidResponse(response)))
    
}, cleanDatabase);
