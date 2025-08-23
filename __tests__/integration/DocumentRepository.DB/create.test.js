import {
    getDocRepo,
    getDoc,
    getAndSetupDocRepo,
    dbHas,
    cleanDatabase
} from './__utils__/automate.js';
import { it, itAsync, assert } from './imports.js';

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

await itAsync('Creates accurate record in database file', async () => {

    const docRepo = await getAndSetupDocRepo();
    const doc = getDoc(data);
    await docRepo.create(doc);

    assert(dbHas(data));

}, cleanDatabase);
await itAsync('Returns object with message and truthy success fields', async () => {

    const docRepo = await getAndSetupDocRepo();
    const doc = getDoc(data);
    const response = await docRepo.create(doc);

    assert(response.message);
    assert(response.success === true);

}, cleanDatabase);
await itAsync('If database file does not exist, returns object with message and falsy success fields', async () => {

    const docRepo = getDocRepo();
    const doc = getDoc(data);
    const response = await docRepo.create(doc);

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase);
