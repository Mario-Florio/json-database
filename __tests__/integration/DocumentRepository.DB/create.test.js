import {
    getDoc,
    getAndSetupDocRepo,
    dbHas,
    cleanDatabase,
} from './__utils__/automate.js';

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
        const doc = getDoc(data);
        await docRepo.create(doc);

        expect(dbHas(doc)).toBe(true);
    });
    it('Returns object with message and truthy success fields', async () => {
        const docRepo = await getAndSetupDocRepo();
        const doc = getDoc(data);
        const response = await docRepo.create(doc);

        expect(response.message).toBeTruthy();
        expect(response.success).toBe(true);
    });
});
