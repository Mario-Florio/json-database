const {
    getDocRepo,
    getAndSetupDocRepo,
    isDocument,
    dbHas,
    cleanDatabase
} = require('./__utils__/automate.js');
const { it, assert } = require('./imports.js');

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
