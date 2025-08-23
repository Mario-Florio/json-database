import {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} from './__utils__/automate.js';
import { itAsync, assert } from './imports.js';

console.log('------FIND------');
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
    let model = await ModelType.find({ _id: model1._id });
    assert(model[0].prop === model1.prop);

    // prop
    model = await ModelType.find({ prop: model2.prop });
    assert(model[0].prop === model2.prop);

    // _id & prop
    model = await ModelType.find({ _id: model3._id, prop: model3.prop });
    assert(model[0].prop === model3.prop);

}, cleanDatabase);
await itAsync('Returns all data if no arguments are passed', async () => {
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

    const models = await ModelType.find();

    assert(models.length === 4);
    assert(models[0].prop === model1.prop);
    assert(models[1].prop === model2.prop);
    assert(models[2].prop === model3.prop);
    assert(models[3].prop === model4.prop);

}, cleanDatabase);
await itAsync('Returns empty array if classKeys are passed and no object is found', async () => {
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

    const res = await ModelType.find({ _id: 'sldkjvb' });

    assert(Array.isArray(res));
    assert(res.length === 0);

}, cleanDatabase);
await itAsync('Returns empty array if database is empty', async () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1);

    const [ model1 ] = getModelInstances(1, ModelType, propsArr);
    
    await model1.save();
    await ModelType.findByIdAndDelete(model1._id);

    let res = await ModelType.find();
    
    assert(Array.isArray(res));
    assert(res.length === 0);

    res = await ModelType.find({ _id: 'kldsjvb' });
    
    assert(Array.isArray(res));
    assert(res.length === 0);

}, cleanDatabase);
