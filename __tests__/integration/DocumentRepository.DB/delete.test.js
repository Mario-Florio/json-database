import {
    getDocRepo,
    getTargetDoc,
    getAndSetupDocRepo,
    dbHas,
    cleanDatabase,
} from './__utils__/automate.js';

const NON_EXISTENT_ID = 'non-existent id';

describe('DOC REPO DELETE', () => {
    afterEach(() => cleanDatabase());

    it('Removes targeted record from database file', async () => {
        const docRepo = await getAndSetupDocRepo({
            fill: { isTrue: true, amount: 10 },
        });

        const targetDoc = await getTargetDoc(docRepo, {
            index: { isTrue: true, value: 5 },
        });

        await docRepo.delete(targetDoc._id);

        expect(dbHas(targetDoc)).toBe(false);
    });
    it('Returns object with message and truthy success fields', async () => {
        const docRepo = await getAndSetupDocRepo({
            fill: { isTrue: true, amount: 10 },
        });

        const targetDoc = await getTargetDoc(docRepo, {
            index: { isTrue: true, value: 5 },
        });

        const response = await docRepo.delete(targetDoc._id);

        expect(response.message).toBeTruthy();
        expect(response.success).toBe(true);
    });
    it('If database file does not exist, returns object with message and falsy success fields', async () => {
        const docRepo = getDocRepo(); // plain doc repo - database file not instantiated

        const response = await docRepo.delete(NON_EXISTENT_ID);

        expect(response.message).toBeTruthy();
        expect(response.success).toBe(false);
    });
    it('If not given id, returns object with message and falsy success fields', async () => {
        const docRepo = await getAndSetupDocRepo();

        const response = await docRepo.delete();

        expect(response.message).toBeTruthy();
        expect(response.success).toBe(false);
    });
    it('If targeted record does not exist, returns object with message and falsy success fields', async () => {
        const docRepo = await getAndSetupDocRepo();

        const response = await docRepo.delete(NON_EXISTENT_ID);

        expect(response.message).toBeTruthy();
        expect(response.success).toBe(false);
    });
});
