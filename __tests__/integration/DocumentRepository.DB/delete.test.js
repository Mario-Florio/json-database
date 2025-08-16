const {
    getDocRepo,
    getDoc,
    getTargetDoc,
    getAndSetupDocRepo,
    fillDocRepo,
    isDocument,
    dbFileExists,
    dbHas,
    cleanDatabase
} = require('./__utils__/automate.js');
const { it, assert } = require('./imports.js');

const NON_EXISTENT_ID = 'non-existent id';

console.log('----DOCUMENT_REPOSITORY_DELETE----');

it('Removes targeted record from database file', () => {

    const docRepo = getAndSetupDocRepo({
        fill: { isTrue: true, amount: 10 }
    });

    const targetDoc = getTargetDoc(
        docRepo,
        { index: { isTrue: true, value: 5 } }
    );

    docRepo.delete(targetDoc._id);

    assert(!dbHas(targetDoc));

}, cleanDatabase, true);
it('Returns object with message and truthy success fields', () => {

    const docRepo = getAndSetupDocRepo({
        fill: { isTrue: true, amount: 10 }
    });

    const targetDoc = getTargetDoc(
        docRepo,
        { index: { isTrue: true, value: 5 } }
    );

    const response = docRepo.delete(targetDoc._id);

    assert(response.message);
    assert(response.success === true);

}, cleanDatabase);
it('If database file does not exist, returns object with message and falsy success fields', () => {

    const docRepo = getDocRepo(); // plain doc repo - database file not instantiated

    const response = docRepo.delete(NON_EXISTENT_ID);

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase);
it('If not given id, returns object with message and falsy success fields', () => {

    const docRepo = getAndSetupDocRepo();

    const response = docRepo.delete();

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase);
it('If targeted record does not exist, returns object with message and falsy success fields', () => {

    const docRepo = getAndSetupDocRepo();

    const response = docRepo.delete(NON_EXISTENT_ID);

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase);
