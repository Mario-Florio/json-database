import {
    instantiateCollection,
    isDocument,
    runInvalidProps,
    isValidResponse,
    cleanDatabase
} from './__utils__/automate.js';
import {
    documentController,
    GET,
    it, assert
} from './imports.js';

console.log('----DOCUMENT_CONTROLLER-GET_DOCUMENTS----');
it('Returns array of Document instances if paramObj props are valid', () => {

    const collectionId = instantiateCollection();
    const paramObj = {
        collectionId,
        keys: {}
    };
    const response = documentController.getDocuments(paramObj);

    assert(Array.isArray(response.data));
    assert(response.data.every(document => isDocument(document)));

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

    const responses = runInvalidProps(GET, paramObj, paramObjSchema);

    assert(responses.every(response => isValidResponse(response)))
    
}, cleanDatabase);
