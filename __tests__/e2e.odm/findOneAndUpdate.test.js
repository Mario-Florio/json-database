import {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} from './__utils__/automate.js';
import { it, assert } from './imports.js';

console.log('------FIND_ONE_AND_UPDATE------');
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

    // _id
    ModelType.findOneAndUpdate({ _id: model1._id }, { prop: updatedProp });
    const updatedModel1 = ModelType.findById(model1._id);
    assert(updatedModel1.prop === updatedProp);

    // prop
    ModelType.findOneAndUpdate({ prop: model2.prop }, { prop: updatedProp });
    const updatedModel2 = ModelType.findById(model2._id);
    assert(updatedModel2.prop === updatedProp);

}, cleanDatabase);
it('Does not update _id & createdAt fields', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1);

    const [ model ] = getModelInstances(1, ModelType, propsArr);

    model.save();

    const updatedId = 'saldjbskjdvbsa';
    const updatedCreatedAt = new Date();
    ModelType.findOneAndUpdate({ _id: model._id }, { _id: updatedId, createdAt: updatedCreatedAt });

    const updatedModel = ModelType.findById(model._id);

    assert(updatedModel._id === model._id);
    assert(updatedModel.createdAt === model.createdAt);

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
    const res = ModelType.findOneAndUpdate({ _id: 'sdjkvbsdv' }, { prop: updatedProp });

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

    const res = ModelType.findOneAndUpdate();

    assert(res === null);

}, cleanDatabase);
