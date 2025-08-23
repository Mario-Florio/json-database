import { setupUseCase, getSchema, getTargetDoc } from './__utils__/automate.js';
import {
    itAsync,
    assert,
    UPDATE,
    isObject
} from './imports.js';

console.log('----UPDATE_DOCUMENTS----');
await itAsync('Returns a non-array object with message and success fields', async () => {

    const useCase = await setupUseCase(UPDATE);
    const schema = getSchema();
    const data = await getTargetDoc(useCase.repo);
    const updatedKeys = { prop: 'updated value' };
    const paramObj = {
        schema,
        _id: data._id,
        data,
        updatedKeys
    };

    const response = await useCase.execute(paramObj);

    assert(isObject(response));
    assert(response.message);
    assert(response.success === true);

}, false, true);
await itAsync('Returns a non-array object with message and falsy success fields if Document does not represent schema', async () => {

    const useCase = await setupUseCase(UPDATE);
    const schema = getSchema();
    const data = await getTargetDoc(useCase.repo);
    delete data.prop
    const updatedKeys = { non_existent_prop: true };
    const paramObj = {
        schema,
        _id: data._id,
        data,
        updatedKeys
    };

    const response = await useCase.execute(paramObj);

    assert(isObject(response));
    assert(response.message);
    assert(response.success === false);

});
