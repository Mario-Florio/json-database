import {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} from './__utils__/automate.js';
import { itAsync, assert } from './imports.js';

console.log('------FIND_ONE_AND_UPDATE------');
await itAsync('Update appropriate item with proper values', async () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(2);

    const [
        model1,
        model2
    ] = getModelInstances(2, ModelType, propsArr);

    await model1.save();
    await model2.save();

    const updatedProp = 'updated prop';

    // _id
    await ModelType.findOneAndUpdate({ _id: model1._id }, { prop: updatedProp });
    const updatedModel1 = await ModelType.findById(model1._id);
    assert(updatedModel1.prop === updatedProp);

    // prop
    await ModelType.findOneAndUpdate({ prop: model2.prop }, { prop: updatedProp });
    const updatedModel2 = await ModelType.findById(model2._id);
    assert(updatedModel2.prop === updatedProp);

}, cleanDatabase);
await itAsync('Does not update _id & createdAt fields', async () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1);

    const [ model ] = getModelInstances(1, ModelType, propsArr);

    await model.save();

    const updatedId = 'saldjbskjdvbsa';
    const updatedCreatedAt = new Date();
    await ModelType.findOneAndUpdate({ _id: model._id }, { _id: updatedId, createdAt: updatedCreatedAt });

    const updatedModel = await ModelType.findById(model._id);

    assert(updatedModel._id === model._id);
    assert(updatedModel.createdAt === model.createdAt);

}, cleanDatabase);
await itAsync('Returns null if no object is found', async () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(2);

    const [
        model1,
        model2
    ] = getModelInstances(2, ModelType, propsArr);

    await model1.save();
    await model2.save();

    const updatedProp = 'updated prop';
    const res = await ModelType.findOneAndUpdate({ _id: 'sdjkvbsdv' }, { prop: updatedProp });

    assert(res === null);

}, cleanDatabase);
await itAsync('Returns null if no arguments are passed', async () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(2);

    const [
        model1,
        model2
    ] = getModelInstances(2, ModelType, propsArr);

    await model1.save();
    await model2.save();

    const res = await ModelType.findOneAndUpdate();

    assert(res === null);

}, cleanDatabase);
