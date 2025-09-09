import { setupUseCase, isDocument } from './__utils__/automate.js';
import {
    itAsync,
    assert,
    FIND
} from './imports.js';

const useCase = await setupUseCase(FIND);

console.log('----FIND_DOCUMENTS----');
await itAsync('Returns an array of Documents', async () => {

    const { data } = await useCase.execute({ keys: {} });
    assert(data.every(document => isDocument(document)));

});
await itAsync('Returns an array of filtered Documents if keys are defined — all Documents have specified key:val pairs', async () => {
    
    const { data } = await useCase.execute({ keys: { prop: 'item 3' } });
    assert(data.every(document => document.prop === 'item 3'));

});
await itAsync('Returns empty array if no Documents has specifiec key-val pairs', async () => {
    
    const { data } = await useCase.execute({ keys: { non_existent_prop: true } });
    assert(Array.isArray(data));
    assert(data.length === 0);

});
