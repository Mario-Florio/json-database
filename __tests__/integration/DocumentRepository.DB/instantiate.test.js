import {
    getDocRepo,
    getAndSetupDocRepo,
    dbFileExists,
    cleanDatabase
} from './__utils__/automate.js';

describe('DOC REPO INSTANTIATE', () => {

    afterEach(() => cleanDatabase());

    it('Instantiates database file', async () => {

        const docRepo = getDocRepo();
        await docRepo.instantiate();

        expect(dbFileExists()).toBe(true);

    });
    it('Returns object with message and truthy success fields', async () => {

        const docRepo = getDocRepo();
        const response = await docRepo.instantiate();

        expect(response.message).toBeTruthy();
        expect(response.success).toBe(true);

    });
    it('If database file already exists, returns object with message and falsy success fields', async () => {

        const docRepo = await getAndSetupDocRepo();
        const response = await docRepo.instantiate();

        expect(response.message).toBeTruthy();
        expect(response.success).toBe(false);

    });
});
