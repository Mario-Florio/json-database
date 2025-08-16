const { setupUseCase, isDocument } = require('./__utils__/automate.js');
const {
    it,
    assert,
    FIND
} = require('./imports.js');

console.log('----FIND_DOCUMENTS----');
it('Returns an array of Documents', () => {
    
    const useCase = setupUseCase(FIND);

    const documents = useCase.execute({ keys: {} });

    assert(documents.every(document => isDocument(document)));

});
it('Returns an array of filtered Documents if keys are defined — all Documents have specified key:val pairs', () => {
    
    const useCase = setupUseCase(FIND);

    const documents = useCase.execute({ keys: { prop: 'item 3' } });

    assert(documents.every(document => document.prop === 'item 3'));

});
it('Returns empty array if no Documents has specifiec key-val pairs', () => {
    
    const useCase = setupUseCase(FIND);

    const documents = useCase.execute({ keys: { non_existent_prop: true } });

    assert(Array.isArray(documents));
    assert(documents.length === 0);

});
