import {
    getDocRepo,
    getAndSetupDocRepo,
    isDocument,
    dbHas,
    cleanDatabase
} from './__utils__/automate.js';
import { it, assert } from './imports.js';

console.log('----DOCUMENT_REPOSITORY_READ----');

it('Returns existing records in database file', () => {

    const docRepo = getAndSetupDocRepo({
        fill: { isTrue: true, amount: 10 }
    });
    const documents = docRepo.read();

    assert(documents.every(document => dbHas(document)));

}, cleanDatabase, true);
it('Returns an array of Document instances', () => {

    const docRepo = getAndSetupDocRepo({
        fill: { isTrue: true, amount: 10 }
    });
    const documents = docRepo.read();

    assert(Array.isArray(documents));
    assert(documents.every(document => isDocument(document)));

}, cleanDatabase);
