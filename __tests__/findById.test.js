const {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} = require('./__utils__/automate.js');
const { it, assert } = require('../shared/testing/test-tools.js');

console.log('------FIND_BY_ID------');
it('Returns appropriate obj', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(4);

    const [
        model1,
        model2,
        model3,
        model4
    ] = getModelInstances(4, ModelType, propsArr);

    model1.save();
    model2.save();
    model3.save();
    model4.save();

    const model = ModelType.findById(model3._id);

    assert(model.prop === 'model 3');

}, cleanDatabase);
it('Returns null if no _id is passed', () => {
    const ModelType = setupSchema();

    const res = ModelType.findById();

    assert(res === null);
});
it('Returns null if no object is found', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(4);

    const [
        model1,
        model2,
        model3,
        model4
    ] = getModelInstances(4, ModelType, propsArr);

    model1.save();
    model2.save();
    model3.save();
    model4.save();

    const res = ModelType.findById('sldkjvb');

    assert(res === null);

}, cleanDatabase);
