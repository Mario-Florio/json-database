import { setupUseCase, isDocument } from './__utils__/automate.js';
import {
    it,
    assert,
    FIND
} from './imports.js';

const useCase = setupUseCase(FIND);

console.log('----FIND_DOCUMENTS----');
it('Returns an array of Documents', () => {

    const { data } = useCase.execute({ keys: {} });
    assert(data.every(document => isDocument(document)));

});
it('Returns an array of filtered Documents if keys are defined — all Documents have specified key:val pairs', () => {
    
    const { data } = useCase.execute({ keys: { prop: 'item 3' } });
    assert(data.every(document => document.prop === 'item 3'));

});
it('Returns empty array if no Documents has specifiec key-val pairs', () => {
    
    const { data } = useCase.execute({ keys: { non_existent_prop: true } });
    assert(Array.isArray(data));
    assert(data.length === 0);

});
