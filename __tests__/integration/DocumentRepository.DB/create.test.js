const {
    getDocRepo,
    getDoc,
    getAndSetupDocRepo,
    dbHas,
    cleanDatabase
} = require('./__utils__/automate.js');
const { it, assert } = require('./imports.js');

const data = {
    string: 'string',
    number: 0,
    boolean: false,
    object: {
        string: 'string',
        number: 4,
        boolean: true,
        object: { string: 'string', number: 4, boolean: true, },
        array: [ true, 0, 'string', { string: 'string', number: 4, boolean: true, }, [ 'string', { string: 'string' } ] ]
    },
    array: [ true, 0, 'string', { string: 'string', number: 4, boolean: true, }, [ 'string', { string: 'string' } ] ]
}

console.log('----DOCUMENT_REPOSITORY_CREATE----');

it('Creates accurate record in database file', () => {

    const docRepo = getAndSetupDocRepo();
    const doc = getDoc(data);
    docRepo.create(doc);

    assert(dbHas(data));

}, cleanDatabase);
it('Returns object with message and truthy success fields', () => {

    const docRepo = getAndSetupDocRepo();
    const doc = getDoc(data);
    const response = docRepo.create(doc);

    assert(response.message);
    assert(response.success === true);

}, cleanDatabase);
it('If database file does not exist, returns object with message and falsy success fields', () => {

    const docRepo = getDocRepo();
    const doc = getDoc(data);
    const response = docRepo.create(doc);

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase);
