import {
    types,
    getCollectionId,
    dbHas,
    isResultObject,
    cleanDatabase
} from './__utils__/automate.js';
import {
    documentController,
    Schema,
    isObject,
    SAVE_SUCCESSFUL,
    DB_DOESNT_EXIST,
    INPUT_IS_INVALID,
    itAsync, it, assert
} from './import.js';

const collectionId = getCollectionId();
const schema = new Schema({
    string: { type: 'string', required: true },
    number: { type: 'number', required: true },
    boolean: { type: 'boolean', required: true },
    object: { type: 'object', required: true },
    array: { type: 'array', required: true }
});
const data = {
    string: 'string',
    number: 0,
    boolean: false,
    object: {
        string: 'string',
        number: 4,
        boolean: true,
        object: { string: 'string', number: 4, boolean: true, },
        array: [ true, 0, 'string', { string: 'string', number: 4, boolean: true, }, [ 'string', { string: 'string' } ] ]
    },
    array: [ true, 0, 'string', { string: 'string', number: 4, boolean: true, }, [ 'string', { string: 'string' } ] ]
}

console.log(`----CREATE----`);
// Happy path
await (async (cleanupFn) => {

    await documentController.instantiateCollection({ collectionId });
    const res = await documentController.createDocument({ collectionId, data, schema });

    it('Creates a document with accurate values in database', () => {
        assert(dbHas(data));
    });
    it('Returns successful Result object', () => {
        assert(isResultObject(res));
    });
    it('Returns Result object with save successful message', () => {
        assert(res.message === SAVE_SUCCESSFUL);
    });
    cleanupFn();

})(cleanDatabase);

await itAsync('Returns input is invalid message if input is invalid', async () => {

    const invalidCollectionIds = types.filter(type => typeof type !== 'string');
    const invalidDatas = types.filter(type => !isObject(type));
    const invalidSchemas = types;

    for (const collectionId of invalidCollectionIds) {
        const res = await documentController.createDocument({ collectionId, data, schema });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const data of invalidDatas) {
        const res = await documentController.createDocument({ collectionId, data, schema });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

    for (const schema of invalidSchemas) {
        const res = await documentController.createDocument({ collectionId, data, schema });
        assert(res.message === INPUT_IS_INVALID);
        assert(res.success === false);
    }

}, cleanDatabase);

await itAsync('Returns database doesn\'t exist message if database file hasn\'t been instantiated', async () => {

    const res = await documentController.createDocument({ collectionId, data, schema });
    assert(res.message === DB_DOESNT_EXIST);
    assert(res.success === false);

}, cleanDatabase);
