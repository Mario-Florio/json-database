import {
    getDocRepo,
    getDoc,
    getTargetDoc,
    getAndSetupDocRepo,
    dbHas,
    cleanDatabase,
    getOperationObj,
} from './__utils__/automate.js';
import { Operation } from './imports.js';

const NON_EXISTENT_ID = 'non-existent id';

describe('DOC REPO UPDATE', () => {
    afterEach(() => cleanDatabase());

    it('Accurately modifies targeted record in database file', async () => {
        const amount = 10;

        const docRepo = await getAndSetupDocRepo({
            fill: { isTrue: true, amount },
        });

        const targetDoc = await getTargetDoc(docRepo);
        const updatedKeys = { prop: 'updated value' };
        const updatedDoc = targetDoc.mergeKeys(updatedKeys);

        const operationObj = getOperationObj(Operation.types.UPDATE_DOCUMENT, {
            _id: targetDoc._id,
            updatedDoc,
        });
        await docRepo.update(operationObj);

        expect(await dbHas(updatedDoc)).toBe(true);
    });
    it('Returns object with message and truthy success fields', async () => {
        const docRepo = await getAndSetupDocRepo({
            fill: { isTrue: true, amount: 10 },
        });

        const targetDoc = await getTargetDoc(docRepo, {
            index: { isTrue: true, value: 5 },
        });
        const updatedKeys = { prop: 'updated value' };
        const updatedDoc = targetDoc.mergeKeys(updatedKeys);

        const operationObj = getOperationObj(Operation.types.UPDATE_DOCUMENT, {
            _id: targetDoc._id,
            updatedDoc,
        });
        const response = await docRepo.update(operationObj);

        expect(response.message).toBeTruthy();
        expect(response.success).toBe(true);
    });
    it('If database file does not exist, returns object with message and falsy success fields', async () => {
        const docRepo = getDocRepo(); // plain doc repo - database file not instantiated

        const operationObj = getOperationObj(Operation.types.UPDATE_DOCUMENT, {
            _id: NON_EXISTENT_ID,
            updatedDoc: getDoc({}),
        });

        const response = await docRepo.update(operationObj);

        expect(response.message).toBeTruthy();
        expect(response.success).toBe(false);
    });
    it('If not given id, returns object with message and falsy success fields', async () => {
        const docRepo = await getAndSetupDocRepo({
            fill: { isTrue: true, amount: 10 },
        });

        const targetDoc = await getTargetDoc(docRepo, {
            index: { isTrue: true, value: 5 },
        });
        const updatedKeys = { prop: 'updated value' };
        const updatedDoc = targetDoc.mergeKeys(updatedKeys);

        const operationObj = getOperationObj(Operation.types.UPDATE_DOCUMENT, {
            /* no _id field */ updatedDoc,
        });

        const response = await docRepo.update(operationObj);

        expect(response.message).toBeTruthy();
        expect(response.success).toBe(false);
    });
    it('If targeted record does not exist, returns object with message and falsy success fields', async () => {
        const docRepo = await getAndSetupDocRepo();

        const operationObj = getOperationObj(Operation.types.UPDATE_DOCUMENT, {
            _id: NON_EXISTENT_ID,
            updatedDoc: getDoc({}),
        });

        const response = await docRepo.update(operationObj);

        expect(response.message).toBeTruthy();
        expect(response.success).toBe(false);
    });
});
