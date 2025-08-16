const { setupUseCase, getSchema, getTargetDoc } = require('./__utils__/automate.js');
const {
    it,
    assert,
    UPDATE,
    isObject
} = require('./imports.js');

console.log('----UPDATE_DOCUMENTS----');
it('Returns a non-array object with message and success fields', () => {

    const useCase = setupUseCase(UPDATE);
    const schema = getSchema();
    const data = getTargetDoc(useCase.repo);
    const updatedKeys = { prop: 'updated value' };
    const paramObj = {
        schema,
        _id: data._id,
        data,
        updatedKeys
    };

    const response = useCase.execute(paramObj);

    assert(isObject(response));
    assert(response.message);
    assert(response.success === true);

}, false, true);
it('Returns a non-array object with message and falsy success fields if Document does not represent schema', () => {

    const useCase = setupUseCase(UPDATE);
    const schema = getSchema();
    const data = getTargetDoc(useCase.repo);
    delete data.prop
    const updatedKeys = { non_existent_prop: true };
    const paramObj = {
        schema,
        _id: data._id,
        data,
        updatedKeys
    };

    const response = useCase.execute(paramObj);

    assert(isObject(response));
    assert(response.message);
    assert(response.success === false);

});
