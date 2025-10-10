import {
    getDoc,
    getOperationObj,
    getAndSetupDocRepo,
    dbHas,
    cleanDatabase,
} from './__utils__/automate.js';
import { Operation } from './imports.js';

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

describe('DOC REPO CREATE', () => {
    afterEach(() => cleanDatabase());

    it('Creates accurate record in database file', async () => {
        const docRepo = await getAndSetupDocRepo();
        const document = getDoc(data);
        const operationObj = getOperationObj(Operation.types.CREATE_DOCUMENT, {
            document,
        });
        await docRepo.create(operationObj);

        expect(await dbHas(document)).toBe(true);
    });
    it('Returns object with message and truthy success fields', async () => {
        const docRepo = await getAndSetupDocRepo();
        const document = getDoc(data);
        const operationObj = getOperationObj(Operation.types.CREATE_DOCUMENT, {
            document,
        });
        const response = await docRepo.create(operationObj);

        expect(response.message).toBeTruthy();
        expect(response.success).toBe(true);
    });
});
