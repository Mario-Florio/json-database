import {
    getDocRepo,
    getAndSetupDocRepo,
    dbFileExists,
    cleanDatabase,
    getOperationObj,
} from './__utils__/automate.js';
import { Operation } from './imports.js';

describe('DOC REPO INSTANTIATE', () => {
    afterEach(() => cleanDatabase());

    it('Instantiates database file', async () => {
        const docRepo = getDocRepo();
        const operationObj = getOperationObj(
            Operation.types.INSTANTIATE_COLLECTION,
            {},
        );
        await docRepo.instantiate(operationObj);

        expect(dbFileExists()).toBe(true);
    });
    it('Returns object with message and truthy success fields', async () => {
        const docRepo = getDocRepo();
        const operationObj = getOperationObj(
            Operation.types.INSTANTIATE_COLLECTION,
            {},
        );
        const response = await docRepo.instantiate(operationObj);

        expect(response.message).toBeTruthy();
        expect(response.success).toBe(true);
    });
    it('If database file already exists, returns object with message and falsy success fields', async () => {
        const docRepo = await getAndSetupDocRepo();
        const operationObj = getOperationObj(
            Operation.types.INSTANTIATE_COLLECTION,
            {},
        );
        const response = await docRepo.instantiate(operationObj);

        expect(response.message).toBeTruthy();
        expect(response.success).toBe(false);
    });
});
