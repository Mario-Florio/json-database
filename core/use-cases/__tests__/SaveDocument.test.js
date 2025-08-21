import { setupUseCase, getSchema } from './__utils__/automate.js';
import {
    it,
    assert,
    SAVE,
    isObject
} from './imports.js';

console.log('----SAVE_DOCUMENTS----');
it('Returns a non-array object with message and truthy success fields', () => {

    const useCase = setupUseCase(SAVE);
    const schema = getSchema();
    const data = { _id: 'id', prop: 'item 11' };

    const paramObj = {
        schema,
        data
    };

    const response = useCase.execute(paramObj);

    assert(isObject(response));
    assert(response.message);
    assert(response.success === true);

});
it('Returns a non-array object with message and falsy success fields if data does not represent schema', () => {

    const useCase = setupUseCase(SAVE);
    const schema = getSchema();
    const data = {
        _id: 'id',
        // doesn't contain collections 'prop'
    };

    const paramObj = {
        schema,
        data
    };

    const response = useCase.execute(paramObj);

    assert(isObject(response));
    assert(response.message);
    assert(response.success === false);

});
