import {
    getAndSetupDocRepo,
    isDocument,
    isResult,
    dbHas,
    cleanDatabase,
    getOperationObj,
} from './__utils__/automate.js';
import { Operation, READ_SUCCESSFUL } from './imports.js';

describe('DOC REPO READ', () => {
    describe('Happy path', () => {
        afterEach(() => cleanDatabase());

        it('Returns a Result object', async () => {
            const docRepo = await getAndSetupDocRepo({
                fill: { isTrue: true, amount: 10 },
            });

            const operationObj = getOperationObj(
                Operation.types.GET_DOCUMENTS,
                {},
            );
            const res = await docRepo.read(operationObj);
            expect(isResult(res)).toBe(true);
        });
        it('Returns a read successful message', async () => {
            const docRepo = await getAndSetupDocRepo({
                fill: { isTrue: true, amount: 10 },
            });
            const operationObj = getOperationObj(
                Operation.types.GET_DOCUMENTS,
                {},
            );
            const res = await docRepo.read(operationObj);

            expect(res.message).toBe(READ_SUCCESSFUL);
        });
        it('Returns successful', async () => {
            const docRepo = await getAndSetupDocRepo({
                fill: { isTrue: true, amount: 10 },
            });
            const operationObj = getOperationObj(
                Operation.types.GET_DOCUMENTS,
                {},
            );
            const res = await docRepo.read(operationObj);

            expect(res.success).toBe(true);
        });
        it('Returns existing records in database file', async () => {
            const docRepo = await getAndSetupDocRepo({
                fill: { isTrue: true, amount: 10 },
            });
            const operationObj = getOperationObj(
                Operation.types.GET_DOCUMENTS,
                {},
            );
            const res = await docRepo.read(operationObj);

            for await (const document of res.gen)
                expect(await dbHas(document)).toBe(true);
        });
        it('Returns a generator which yeilds Document instances', async () => {
            const docRepo = await getAndSetupDocRepo({
                fill: { isTrue: true, amount: 10 },
            });
            const operationObj = getOperationObj(
                Operation.types.GET_DOCUMENTS,
                {},
            );
            const res = await docRepo.read(operationObj);

            for await (const document of res.gen)
                expect(isDocument(document)).toBe(true);
        });
    });
});
