import {
    instantiateCollection,
    runInvalidProps,
    isValidResponse,
    cleanDatabase
} from './__utils__/automate.js';
import {
    documentController,
    Schema,
    CREATE,
    it, assert
} from './imports.js';

console.log('----DOCUMENT_CONTROLLER-CREATE_DOCUMENT----');
it('Returns non-array object if paramObj props are valid', () => {

    const collectionId = instantiateCollection();
    const paramObj = {
        collectionId,
        data: {},
        schema: new Schema({})
    };

    const response = documentController.createDocument(paramObj);

    assert(isValidResponse(response));

}, cleanDatabase);
it('Returns non-array object if paramObj props are invalid', () => {

    const collectionId = instantiateCollection();
    const paramObj = {
        collectionId,
        data: {},
        schema: new Schema({})
    };

    const paramObjSchema = {
        collectionId: 'string',
        data: 'object',
        schema: 'schema'
    };

    const responses = runInvalidProps(CREATE, paramObj, paramObjSchema);

    assert(responses.every(response => isValidResponse(response)))
    
}, cleanDatabase);
