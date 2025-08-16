const { setupUseCase, isDocument } = require('./__utils__/automate.js');
const {
    it,
    assert,
    FIND_ONE
} = require('./imports.js');

console.log('----FIND_ONE_DOCUMENT----');
it('Returns an instance of Document', () => {

    const useCase = setupUseCase(FIND_ONE);

    const document = useCase.execute({ keys: { prop: 'item 1' } });

    assert(isDocument(document));

}, false, true);
it('Returned Document has all specified key:val pairs', () => {
   
    const useCase = setupUseCase(FIND_ONE);

    const document = useCase.execute({ keys: { prop: 'item 1' } });

    assert(document.prop === 'item 1');

});
it('Returns null if no Document is found to have all specified key:val pairs', () => {
    
    const useCase = setupUseCase(FIND_ONE);

    const document = useCase.execute({ keys: { non_existent_prop: true } });

    assert(document === null);

});
