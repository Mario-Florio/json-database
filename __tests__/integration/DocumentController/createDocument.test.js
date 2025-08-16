const {
    instantiateCollection,
    runInvalidProps,
    isValidResponse,
    cleanDatabase
} = require('./__utils__/automate.js');
const {
    documentController,
    Schema,
    CREATE,
    it, assert
} = require('./imports.js');

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
