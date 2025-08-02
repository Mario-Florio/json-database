const {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} = require('./__utils__/automate.js');
const { it, assert } = require('./__utils__/test-tools.js');

console.log('------FIND_ONE------');
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

    // _id
    let model = ModelType.findOne({ _id: model1._id });
    assert(model.prop === model1.prop);

    // prop
    model = ModelType.findOne({ prop: model2.prop });
    assert(model.prop === model2.prop);

    // _id & prop
    model = ModelType.findOne({ _id: model3._id, prop: model3.prop });
    assert(model.prop === model3.prop);

}, cleanDatabase);
it('Returns first obj which meets criteria (in order of created first)', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(4, false);

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

    const model = ModelType.findOne({ prop: 'model' });

    assert(!model.length);
    assert(model._id === model1._id);

}, cleanDatabase);
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

    const res = ModelType.findOne({ _id: 'sdajvkbiu' });

    assert(res === null);

}, cleanDatabase);
