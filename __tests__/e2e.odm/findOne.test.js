import {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} from './__utils__/automate.js';
import { itAsync, assert } from './imports.js';

console.log('------FIND_ONE------');
await itAsync('Returns appropriate obj', async () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(4);

    const [
        model1,
        model2,
        model3,
        model4
    ] = getModelInstances(4, ModelType, propsArr);

    await model1.save();
    await model2.save();
    await model3.save();
    await model4.save();

    // _id
    let model = await ModelType.findOne({ _id: model1._id });
    assert(model.prop === model1.prop);

    // prop
    model = await ModelType.findOne({ prop: model2.prop });
    assert(model.prop === model2.prop);

    // _id & prop
    model = await ModelType.findOne({ _id: model3._id, prop: model3.prop });
    assert(model.prop === model3.prop);

}, cleanDatabase);
await itAsync('Returns first obj which meets criteria (in order of created first)', async () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(4, false);

    const [
        model1,
        model2,
        model3,
        model4
    ] = getModelInstances(4, ModelType, propsArr);

    await model1.save();
    await model2.save();
    await model3.save();
    await model4.save();

    const model = await ModelType.findOne({ prop: 'model' });

    assert(!model.length);
    assert(model._id === model1._id);

}, cleanDatabase);
await itAsync('Returns null if no object is found', async () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(4);

    const [
        model1,
        model2,
        model3,
        model4
    ] = getModelInstances(4, ModelType, propsArr);

    await model1.save();
    await model2.save();
    await model3.save();
    await model4.save();

    const res = await ModelType.findOne({ _id: 'sdajvkbiu' });

    assert(res === null);

}, cleanDatabase);
