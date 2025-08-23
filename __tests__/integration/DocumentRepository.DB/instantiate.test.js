import {
    getDocRepo,
    getAndSetupDocRepo,
    dbFileExists,
    cleanDatabase
} from './__utils__/automate.js';
import { itAsync, assert } from './imports.js';

console.log('----DOCUMENT_REPOSITORY_INSTANTIATE----');

await itAsync('Instantiates database file', async () => {

    const docRepo = getDocRepo();
    await docRepo.instantiate();

    assert(dbFileExists());

}, cleanDatabase);
await itAsync('Returns object with message and truthy success fields', async () => {

    const docRepo = getDocRepo();
    const response = await docRepo.instantiate();

    assert(response.message);
    assert(response.success === true);

}, cleanDatabase);
await itAsync('If database file already exists, returns object with message and falsy success fields', async () => {

    const docRepo = await getAndSetupDocRepo();
    const response = await docRepo.instantiate();

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase);
