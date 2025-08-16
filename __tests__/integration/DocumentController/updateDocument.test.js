const {
    instantiateCollection,
    runInvalidProps,
    isValidResponse,
    cleanDatabase
} = require('./__utils__/automate.js');
const {
    documentController,
    Schema,
    UPDATE,
    it, assert
} = require('./imports.js');

console.log('----DOCUMENT_CONTROLLER-UPDATE_DOCUMENT----');
it('Returns non-array object if paramObj props are valid', () => {

    const collectionId = instantiateCollection();
    const paramObj = {
        collectionId,
        _id: '',
        data: {},
        schema: new Schema({}),
        updatedKeys: {}
    };

    const response = documentController.updateDocument(paramObj);

    assert(isValidResponse(response));

}, cleanDatabase);
it('Returns non-array object if paramObj props are invalid', () => {

    const collectionId = instantiateCollection();
    const paramObj = {
        collectionId,
        _id: '',
        data: {},
        schema: new Schema({}),
        updatedKeys: {}
    };

    const paramObjSchema = {
        collectionId: 'string',
        _id: 'string',
        data: 'object',
        schema: 'schema',
        updatedKeys: 'object'
    };

    const responses = runInvalidProps(UPDATE, paramObj, paramObjSchema);

    assert(responses.every(response => isValidResponse(response)))
    
}, cleanDatabase);
