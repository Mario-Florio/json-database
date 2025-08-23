import { setupUseCase, getSchema } from './__utils__/automate.js';
import {
    it, itAsync,
    assert,
    SAVE,
    isObject
} from './imports.js';

console.log('----SAVE_DOCUMENTS----');
await itAsync('Returns a non-array object with message and truthy success fields', async () => {

    const useCase = await setupUseCase(SAVE);
    const schema = getSchema();
    const data = { _id: 'id', prop: 'item 11' };

    const paramObj = {
        schema,
        data
    };

    const response = await useCase.execute(paramObj);

    assert(isObject(response));
    assert(response.message);
    assert(response.success === true);

});
await itAsync('Returns a non-array object with message and falsy success fields if data does not represent schema', async () => {

    const useCase = await setupUseCase(SAVE);
    const schema = getSchema();
    const data = {
        _id: 'id',
        // doesn't contain collections 'prop'
    };

    const paramObj = {
        schema,
        data
    };

    const response = await useCase.execute(paramObj);

    assert(isObject(response));
    assert(response.message);
    assert(response.success === false);

});
