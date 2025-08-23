import {
    getDocRepo,
    getDoc,
    getTargetDoc,
    getAndSetupDocRepo,
    fillDocRepo,
    isDocument,
    dbFileExists,
    dbHas,
    cleanDatabase
} from './__utils__/automate.js';
import { itAsync, assert } from './imports.js';

const NON_EXISTENT_ID = 'non-existent id';

console.log('----DOCUMENT_REPOSITORY_DELETE----');

await itAsync('Removes targeted record from database file', async () => {

    const docRepo = await getAndSetupDocRepo({
        fill: { isTrue: true, amount: 10 }
    });

    const targetDoc = await getTargetDoc(
        docRepo,
        { index: { isTrue: true, value: 5 } }
    );

    await docRepo.delete(targetDoc._id);

    assert(!dbHas(targetDoc));

}, cleanDatabase, true);
await itAsync('Returns object with message and truthy success fields', async () => {

    const docRepo = await getAndSetupDocRepo({
        fill: { isTrue: true, amount: 10 }
    });

    const targetDoc = await getTargetDoc(
        docRepo,
        { index: { isTrue: true, value: 5 } }
    );

    const response = await docRepo.delete(targetDoc._id);

    assert(response.message);
    assert(response.success === true);

}, cleanDatabase);
await itAsync('If database file does not exist, returns object with message and falsy success fields', async () => {

    const docRepo = getDocRepo(); // plain doc repo - database file not instantiated

    const response = await docRepo.delete(NON_EXISTENT_ID);

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase);
await itAsync('If not given id, returns object with message and falsy success fields', async () => {

    const docRepo = await getAndSetupDocRepo();

    const response = await docRepo.delete();

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase);
await itAsync('If targeted record does not exist, returns object with message and falsy success fields', async () => {

    const docRepo = await getAndSetupDocRepo();

    const response = await docRepo.delete(NON_EXISTENT_ID);

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase);
