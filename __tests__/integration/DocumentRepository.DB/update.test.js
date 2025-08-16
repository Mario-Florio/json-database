const {
    getDocRepo,
    getDoc,
    getTargetDoc,
    getAndSetupDocRepo,
    dbHas,
    cleanDatabase
} = require('./__utils__/automate.js');
const { it, assert } = require('./imports.js');

const NON_EXISTENT_ID = 'non-existent id';

console.log('----DOCUMENT_REPOSITORY_UPDATE----');

it('Accurately modifies targeted record in database file', () => {

    const amount = 10;

    const docRepo = getAndSetupDocRepo({
        fill: { isTrue: true, amount }
    });

    const targetDoc = getTargetDoc(docRepo);
    const updatedKeys = { prop: 'updated value' };
    const updatedDoc = targetDoc.mergeKeys(updatedKeys);

    docRepo.update(targetDoc._id, updatedDoc);

    assert(dbHas(updatedDoc));

}, cleanDatabase, true);
it('Returns object with message and truthy success fields', () => {

    const docRepo = getAndSetupDocRepo({
        fill: { isTrue: true, amount: 10 }
    });

    const targetDoc = getTargetDoc(
        docRepo,
        { index: { isTrue: true, value: 5 } }
    );
    const updatedKeys = { prop: 'updated value' };
    const updatedDoc = targetDoc.mergeKeys(updatedKeys);
    
    const response = docRepo.update(targetDoc._id, updatedDoc);

    assert(response.message);
    assert(response.success === true);

}, cleanDatabase);
it('If database file does not exist, returns object with message and falsy success fields', () => {

    const docRepo = getDocRepo(); // plain doc repo - database file not instantiated

    const response = docRepo.update('id', getDoc({}));

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase,);
it('If not given id, returns object with message and falsy success fields', () => {

    const docRepo = getAndSetupDocRepo({
        fill: { isTrue: true, amount: 10 }
    });

    const targetDoc = getTargetDoc(
        docRepo,
        { index: { isTrue: true, value: 5 } }
    );
    const updatedKeys = { prop: 'updated value' };
    const updatedDoc = targetDoc.mergeKeys(updatedKeys);
    
    const response = docRepo.update(null, updatedDoc);

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase);
it('If targeted record does not exist, returns object with message and falsy success fields', () => {

    const docRepo = getAndSetupDocRepo();
    
    const response = docRepo.update(NON_EXISTENT_ID, getDoc({}));

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase);
