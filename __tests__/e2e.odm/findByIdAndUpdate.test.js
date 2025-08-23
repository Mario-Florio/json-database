import {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} from './__utils__/automate.js';
import { itAsync, assert } from './imports.js';

console.log('------FIND_BY_ID_AND_UPDATE------');
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
    await ModelType.findByIdAndUpdate(model2._id, { prop: updatedProp });

    const updatedModel2 = await ModelType.findById(model2._id);

    assert(updatedModel2.prop === updatedProp);

}, cleanDatabase);
await itAsync('Does not update _id & createdAt fields', async () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1);

    const [ model1 ] = getModelInstances(1, ModelType, propsArr);
    await model1.save();

    const updatedId = 'saldjbskjdvbsa';
    const updatedCreatedAt = new Date();
    await ModelType.findByIdAndUpdate(model1._id, { _id: updatedId, createdAt: updatedCreatedAt });

    const updatedModel = await ModelType.findById(model1._id);

    assert(updatedModel._id === model1._id);
    assert(updatedModel.createdAt === model1.createdAt);

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
    const res = await ModelType.findByIdAndUpdate('sdjkvbsdv', { prop: updatedProp });

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

    const res = await ModelType.findByIdAndUpdate();

    assert(res === null);

}, cleanDatabase);
