import {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} from './__utils__/automate.js';
import { itAsync, assert } from './imports.js';

console.log('------VIRTUALS------');
await itAsync('Virtuals work', async () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1, false);

    const [ model ] = getModelInstances(1, ModelType, propsArr);

    await model.save();

    assert(model.virtualProp === "This is a virtual prop from model.")

}, cleanDatabase);
await itAsync('Virtuals work on queried data: find', async () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(2);

    const [
        model1,
        model2
    ] = getModelInstances(2, ModelType, propsArr);

    await model1.save();
    await model2.save();

    const models = await ModelType.find();

    assert(models[0].virtualProp === "This is a virtual prop from model 1.");
    assert(models[1].virtualProp === "This is a virtual prop from model 2.");

    const model = await ModelType.find(model1);

    assert(model[0].virtualProp === "This is a virtual prop from model 1.");

}, cleanDatabase);
await itAsync('Virtuals work on queried data: findById', async () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1);

    const [ model1 ] = getModelInstances(1, ModelType, propsArr);

    await model1.save();

    const model = await ModelType.findById(model1._id);

    assert(model.virtualProp === "This is a virtual prop from model 1.");

}, cleanDatabase);
await itAsync('Virtuals work on queried data: findOne', async () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1);

    const [ model1 ] = getModelInstances(1, ModelType, propsArr);

    await model1.save();

    const model = await ModelType.findOne(model1);

    assert(model.virtualProp === "This is a virtual prop from model 1.");

}, cleanDatabase);
