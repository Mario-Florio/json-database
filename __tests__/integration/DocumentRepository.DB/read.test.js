import {
    getAndSetupDocRepo,
    isDocument,
    isResult,
    dbHas,
    cleanDatabase
} from './__utils__/automate.js';
import {
    READ_SUCCESSFUL
} from './imports.js';

describe('DOC REPO READ', () => {

    describe('Happy path', () => {

        afterEach(() => cleanDatabase());

        it('Returns a Result object', async () => {
            const docRepo = await getAndSetupDocRepo({
                fill: { isTrue: true, amount: 10 }
            });
            const res = await docRepo.read();
            expect(isResult(res)).toBe(true);
        });
        it('Returns a read successful message', async () => {
            const docRepo = await getAndSetupDocRepo({
                fill: { isTrue: true, amount: 10 }
            });
            const res = await docRepo.read();
            expect(res.message).toBe(READ_SUCCESSFUL);
        });
        it('Returns successful', async () => {
            const docRepo = await getAndSetupDocRepo({
                fill: { isTrue: true, amount: 10 }
            });
            const res = await docRepo.read();
            expect(res.success).toBe(true);
        });
        it('Returns existing records in database file', async () => {
            const docRepo = await getAndSetupDocRepo({
                fill: { isTrue: true, amount: 10 }
            });
            const res = await docRepo.read();
            expect(res.data.every(document => dbHas(document))).toBe(true);
        });
        it('Returns an array of Document instances', async () => {
            const docRepo = await getAndSetupDocRepo({
                fill: { isTrue: true, amount: 10 }
            });
            const res = await docRepo.read();
            expect(Array.isArray(res.data)).toBe(true);
            expect(res.data.every(document => isDocument(document))).toBe(true);
        });
    });
});
