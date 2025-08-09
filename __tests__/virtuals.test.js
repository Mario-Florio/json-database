const {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} = require('./__utils__/automate.js');
const { it, assert } = require('../shared/testing/test-tools.js');

console.log('------VIRTUALS------');
it('Virtuals work', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1, false);

    const [ model ] = getModelInstances(1, ModelType, propsArr);

    model.save();

    assert(model.virtualProp === "This is a virtual prop from model.")

}, cleanDatabase);
it('Virtuals work on queried data: find', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(2);

    const [
        model1,
        model2
    ] = getModelInstances(2, ModelType, propsArr);

    model1.save();
    model2.save();

    const models = ModelType.find();

    assert(models[0].virtualProp === "This is a virtual prop from model 1.");
    assert(models[1].virtualProp === "This is a virtual prop from model 2.");

    const model = ModelType.find(model1);

    assert(model[0].virtualProp === "This is a virtual prop from model 1.");

}, cleanDatabase);
it('Virtuals work on queried data: findById', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1);

    const [ model1 ] = getModelInstances(1, ModelType, propsArr);

    model1.save();

    const model = ModelType.findById(model1._id);

    assert(model.virtualProp === "This is a virtual prop from model 1.");

}, cleanDatabase);
it('Virtuals work on queried data: findOne', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1);

    const [ model1 ] = getModelInstances(1, ModelType, propsArr);

    model1.save();

    const model = ModelType.findOne(model1);

    assert(model.virtualProp === "This is a virtual prop from model 1.");

}, cleanDatabase);
