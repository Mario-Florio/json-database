import {
    getDocRepo,
    getAndSetupDocRepo,
    dbFileExists,
    cleanDatabase
} from './__utils__/automate.js';
import { it, assert } from './imports.js';

console.log('----DOCUMENT_REPOSITORY_INSTANTIATE----');

it('Instantiates database file', () => {

    const docRepo = getDocRepo();
    docRepo.instantiate();

    assert(dbFileExists());

}, cleanDatabase);
it('Returns object with message and truthy success fields', () => {

    const docRepo = getDocRepo();
    const response = docRepo.instantiate();

    assert(response.message);
    assert(response.success === true);

}, cleanDatabase);
it('If database file already exists, returns object with message and falsy success fields', () => {

    const docRepo = getAndSetupDocRepo();
    const response = docRepo.instantiate();

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase);
