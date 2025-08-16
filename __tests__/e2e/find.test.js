const {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} = require('./__utils__/automate.js');
const { it, assert } = require('./imports.js');

console.log('------FIND------');
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
    let model = ModelType.find({ _id: model1._id });
    assert(model[0].prop === model1.prop);

    // prop
    model = ModelType.find({ prop: model2.prop });
    assert(model[0].prop === model2.prop);

    // _id & prop
    model = ModelType.find({ _id: model3._id, prop: model3.prop });
    assert(model[0].prop === model3.prop);

}, cleanDatabase);
it('Returns all data if no arguments are passed', () => {
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

    const models = ModelType.find();

    assert(models.length === 4);
    assert(models[0].prop === model1.prop);
    assert(models[1].prop === model2.prop);
    assert(models[2].prop === model3.prop);
    assert(models[3].prop === model4.prop);

}, cleanDatabase);
it('Returns empty array if classKeys are passed and no object is found', () => {
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

    const res = ModelType.find({ _id: 'sldkjvb' });

    assert(Array.isArray(res));
    assert(res.length === 0);

}, cleanDatabase);
it('Returns empty array if database is empty', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1);

    const [ model1 ] = getModelInstances(1, ModelType, propsArr);
    
    model1.save();
    ModelType.findByIdAndDelete(model1._id);

    let res = ModelType.find();
    
    assert(Array.isArray(res));
    assert(res.length === 0);

    res = ModelType.find({ _id: 'kldsjvb' });
    
    assert(Array.isArray(res));
    assert(res.length === 0);

}, cleanDatabase);
