import { setupUseCase, isDocument } from './__utils__/automate.js';
import {
    it,
    assert,
    FIND_ONE
} from './imports.js';

const useCase = setupUseCase(FIND_ONE);

console.log('----FIND_ONE_DOCUMENT----');
it('Returns an instance of Document', () => {

    const { data } = useCase.execute({ keys: { prop: 'item 1' } });
    assert(isDocument(data));

}, false, true);
it('Returned Document has all specified key:val pairs', () => {
   
    const { data } = useCase.execute({ keys: { prop: 'item 1' } });
    assert(data.prop === 'item 1');

});
it('Returns null if no Document is found to have all specified key:val pairs', () => {

    const { data } = useCase.execute({ keys: { non_existent_prop: true } });
    assert(data === null);

});
