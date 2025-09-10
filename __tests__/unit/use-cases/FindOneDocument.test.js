import { setupUseCase, isDocument } from './__utils__/automate.js';
import {
    itAsync,
    assert,
    FIND_ONE
} from './imports.js';

const useCase = await setupUseCase(FIND_ONE);

console.log('----FIND_ONE_DOCUMENT----');
await itAsync('Returns an instance of Document', async () => {

    const { data } = await useCase.execute({ keys: { prop: 'item 1' } });
    assert(isDocument(data));

}, false, true);
await itAsync('Returned Document has all specified key:val pairs', async () => {
   
    const { data } = await useCase.execute({ keys: { prop: 'item 1' } });
    assert(data.prop === 'item 1');

});
await itAsync('Returns null if no Document is found to have all specified key:val pairs', async () => {

    const { data } = await useCase.execute({ keys: { non_existent_prop: true } });
    assert(data === null);

});
