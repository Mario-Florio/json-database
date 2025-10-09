import {
    types,
    getCollectionId,
    dbHas,
    isResultObject,
    cleanDatabase,
} from './__utils__/automate.js';
import {
    documentController,
    Operation,
    Schema,
    isObject,
    SAVE_SUCCESSFUL,
    INPUT_IS_INVALID,
} from './import.js';

const collectionId = getCollectionId();
const schema = new Schema({
    string: { type: 'string', required: true },
    number: { type: 'number', required: true },
    boolean: { type: 'boolean', required: true },
    object: { type: 'object', required: true },
    array: { type: 'array', required: true },
});
const data = {
    string: 'string',
    number: 0,
    boolean: false,
    object: {
        string: 'string',
        number: 4,
        boolean: true,
        object: { string: 'string', number: 4, boolean: true },
        array: [
            true,
            0,
            'string',
            { string: 'string', number: 4, boolean: true },
            ['string', { string: 'string' }],
        ],
    },
    array: [
        true,
        0,
        'string',
        { string: 'string', number: 4, boolean: true },
        ['string', { string: 'string' }],
    ],
};

describe('CREATE', () => {
    describe('Happy path', () => {
        beforeAll(async () => {
            const operation = new Operation({
                type: Operation.types.INSTANTIATE_COLLECTION,
                collectionId,
                payload: {},
            });
            await documentController.instantiateCollection(operation);
        });
        afterAll(() => cleanDatabase());

        it('Creates a document with accurate values in database', async () => {
            const operation = new Operation({
                type: Operation.types.CREATE_DOCUMENT,
                collectionId,
                payload: { data, schema },
            });
            await documentController.createDocument(operation);
            expect(dbHas(data)).toBe(true);
        });
        it('Returns successful Result object', async () => {
            const operation = new Operation({
                type: Operation.types.CREATE_DOCUMENT,
                collectionId,
                payload: { data, schema },
            });
            const res = await documentController.createDocument(operation);
            expect(isResultObject(res)).toBe(true);
        });
        it('Returns Result object with save successful message', async () => {
            const operation = new Operation({
                type: Operation.types.CREATE_DOCUMENT,
                collectionId,
                payload: { data, schema },
            });
            const res = await documentController.createDocument(operation);
            expect(res.message).toBe(SAVE_SUCCESSFUL);
        });
    });

    describe('Sad path :(', () => {
        it('Returns input is invalid message if input is invalid', async () => {
            const invalidDatas = types.filter((type) => !isObject(type));
            const invalidSchemas = types;

            for (const data of invalidDatas) {
                const operation = new Operation({
                    type: Operation.types.CREATE_DOCUMENT,
                    collectionId,
                    payload: { data, schema },
                });
                const res = await documentController.createDocument(operation);
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }

            for (const schema of invalidSchemas) {
                const operation = new Operation({
                    type: Operation.types.CREATE_DOCUMENT,
                    collectionId,
                    payload: { data, schema },
                });
                const res = await documentController.createDocument(operation);
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }
        });
    });
});
