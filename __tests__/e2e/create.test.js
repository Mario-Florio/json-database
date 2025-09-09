import {
    types,
    getCollectionId,
    dbHas,
    isResultObject,
    cleanDatabase,
} from './__utils__/automate.js';
import {
    documentController,
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
        beforeAll(
            async () =>
                await documentController.instantiateCollection({
                    collectionId,
                }),
        );
        afterAll(() => cleanDatabase());

        it('Creates a document with accurate values in database', async () => {
            const res = await documentController.createDocument({
                collectionId,
                data,
                schema,
            });
            expect(dbHas(data)).toBe(true);
        });
        it('Returns successful Result object', async () => {
            const res = await documentController.createDocument({
                collectionId,
                data,
                schema,
            });
            expect(isResultObject(res)).toBe(true);
        });
        it('Returns Result object with save successful message', async () => {
            const res = await documentController.createDocument({
                collectionId,
                data,
                schema,
            });
            expect(res.message).toBe(SAVE_SUCCESSFUL);
        });
    });

    describe('Sad path :(', () => {
        it('Returns input is invalid message if input is invalid', async () => {
            const invalidCollectionIds = types.filter(
                (type) => typeof type !== 'string',
            );
            const invalidDatas = types.filter((type) => !isObject(type));
            const invalidSchemas = types;

            for (const collectionId of invalidCollectionIds) {
                const res = await documentController.createDocument({
                    collectionId,
                    data,
                    schema,
                });
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }

            for (const data of invalidDatas) {
                const res = await documentController.createDocument({
                    collectionId,
                    data,
                    schema,
                });
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }

            for (const schema of invalidSchemas) {
                const res = await documentController.createDocument({
                    collectionId,
                    data,
                    schema,
                });
                expect(res.message).toBe(INPUT_IS_INVALID);
                expect(res.success).toBe(false);
            }
        });
    });
});
