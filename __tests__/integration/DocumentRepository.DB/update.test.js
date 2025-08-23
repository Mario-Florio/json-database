import {
    getDocRepo,
    getDoc,
    getTargetDoc,
    getAndSetupDocRepo,
    dbHas,
    cleanDatabase
} from './__utils__/automate.js';
import { it, itAsync, assert } from './imports.js';

const NON_EXISTENT_ID = 'non-existent id';

console.log('----DOCUMENT_REPOSITORY_UPDATE----');

await itAsync('Accurately modifies targeted record in database file', async () => {

    const amount = 10;

    const docRepo = await getAndSetupDocRepo({
        fill: { isTrue: true, amount }
    });

    const targetDoc = await getTargetDoc(docRepo);
    const updatedKeys = { prop: 'updated value' };
    const updatedDoc = targetDoc.mergeKeys(updatedKeys);

    await docRepo.update(targetDoc._id, updatedDoc);

    assert(dbHas(updatedDoc));

}, cleanDatabase, true);
await itAsync('Returns object with message and truthy success fields', async () => {

    const docRepo = await getAndSetupDocRepo({
        fill: { isTrue: true, amount: 10 }
    });

    const targetDoc = await getTargetDoc(
        docRepo,
        { index: { isTrue: true, value: 5 } }
    );
    const updatedKeys = { prop: 'updated value' };
    const updatedDoc = targetDoc.mergeKeys(updatedKeys);
    
    const response = await docRepo.update(targetDoc._id, updatedDoc);

    assert(response.message);
    assert(response.success === true);

}, cleanDatabase);
await itAsync('If database file does not exist, returns object with message and falsy success fields', async () => {

    const docRepo = getDocRepo(); // plain doc repo - database file not instantiated

    const response = await docRepo.update('id', getDoc({}));

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase,);
await itAsync('If not given id, returns object with message and falsy success fields', async () => {

    const docRepo = await getAndSetupDocRepo({
        fill: { isTrue: true, amount: 10 }
    });

    const targetDoc = await getTargetDoc(
        docRepo,
        { index: { isTrue: true, value: 5 } }
    );
    const updatedKeys = { prop: 'updated value' };
    const updatedDoc = targetDoc.mergeKeys(updatedKeys);
    
    const response = await docRepo.update(null, updatedDoc);

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase);
await itAsync('If targeted record does not exist, returns object with message and falsy success fields', async () => {

    const docRepo = await getAndSetupDocRepo();
    
    const response = await docRepo.update(NON_EXISTENT_ID, getDoc({}));

    assert(response.message);
    assert(response.success === false);

}, cleanDatabase);
