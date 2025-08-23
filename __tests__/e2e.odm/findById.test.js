import {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} from './__utils__/automate.js';
import { itAsync, assert } from './imports.js';

console.log('------FIND_BY_ID------');
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

    const model = await ModelType.findById(model3._id);

    assert(model.prop === 'model 3');

}, cleanDatabase);
await itAsync('Returns null if no _id is passed', async () => {
    const ModelType = setupSchema();

    const res = await ModelType.findById();

    assert(res === null);
});
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

    const res = await ModelType.findById('sldkjvb');

    assert(res === null);

}, cleanDatabase);
