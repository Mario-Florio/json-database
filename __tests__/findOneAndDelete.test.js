const {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} = require('./__utils__/automate.js');
const { it, assert } = require('./__utils__/test-tools.js');

console.log('------FIND_ONE_AND_DELETE------');
it('Deletes appropriate object', () => {
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

    ModelType.findOneAndDelete({ _id: model3._id });
    
    const models = ModelType.find();

    assert(models.length === 3);
    assert(models[2].prop !== model3.prop);

}, cleanDatabase);
it('Returns "Deletion successful" message if deletion is successful', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1, false);

    const [ model ] = getModelInstances(1, ModelType, propsArr);

    model.save();

    const res = ModelType.findOneAndDelete({ _id: model._id });
    
    assert(res.message === 'Deletion successful');

}, cleanDatabase);
it('Returns "Item was not found" message if no object is found', () => {
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

    const res = ModelType.findOneAndDelete({ _id: '_id' });
    
    assert(res.message === 'Item was not found');

}, cleanDatabase);
it('Returns null if no arguments are passed', () => {
    const ModelType = setupSchema();

    const res = ModelType.findOneAndDelete();

    assert(res === null);
}, cleanDatabase);
