import {
    getAndSetupDocRepo,
    isDocument,
    isResult,
    dbHas,
    cleanDatabase
} from './__utils__/automate.js';
import {
    READ_SUCCESSFUL,
    it, assert
} from './imports.js';

console.log('----DOCUMENT_REPOSITORY_READ----');
// Happy path
((cleanupFn) => {

    const docRepo = getAndSetupDocRepo({
        fill: { isTrue: true, amount: 10 }
    });
    const response = docRepo.read();
    const { message, success, data } = response;

    it('Returns a Result object', () => {
        assert(isResult(response));
    });
    it('Returns a read successful message', () => {
        assert(message === READ_SUCCESSFUL);
    });
    it('Returns successful', () => {
        assert(success === true);
    });
    it('Returns existing records in database file', () => {
        assert(data.every(document => dbHas(document)));
    });
    it('Returns an array of Document instances', () => {
        assert(Array.isArray(data));
        assert(data.every(document => isDocument(document)));
    });
    cleanupFn();

})(cleanDatabase);
