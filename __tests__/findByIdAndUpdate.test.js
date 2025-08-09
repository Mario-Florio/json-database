const {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} = require('./__utils__/automate.js');
const { it, assert } = require('../shared/testing/test-tools.js');

console.log('------FIND_BY_ID_AND_UPDATE------');
it('Update appropriate item with proper values', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(2);

    const [
        model1,
        model2
    ] = getModelInstances(2, ModelType, propsArr);

    model1.save();
    model2.save();

    const updatedProp = 'updated prop';
    ModelType.findByIdAndUpdate(model2._id, { prop: updatedProp });

    const updatedModel2 = ModelType.findById(model2._id);

    assert(updatedModel2.prop === updatedProp);

}, cleanDatabase);
it('Does not update _id & createdAt fields', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1);

    const [ model1 ] = getModelInstances(1, ModelType, propsArr);
    model1.save();

    const updatedId = 'saldjbskjdvbsa';
    const updatedCreatedAt = new Date();
    ModelType.findByIdAndUpdate(model1._id, { _id: updatedId, createdAt: updatedCreatedAt });

    const updatedModel = ModelType.findById(model1._id);

    assert(updatedModel._id === model1._id);
    assert(updatedModel.createdAt === model1.createdAt);

}, cleanDatabase);
it('Returns null if no object is found', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(2);

    const [
        model1,
        model2
    ] = getModelInstances(2, ModelType, propsArr);

    model1.save();
    model2.save();

    const updatedProp = 'updated prop';
    const res = ModelType.findByIdAndUpdate('sdjkvbsdv', { prop: updatedProp });

    assert(res === null);

}, cleanDatabase);
it('Returns null if no arguments are passed', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(2);

    const [
        model1,
        model2
    ] = getModelInstances(2, ModelType, propsArr);

    model1.save();
    model2.save();

    const res = ModelType.findByIdAndUpdate();

    assert(res === null);

}, cleanDatabase);
