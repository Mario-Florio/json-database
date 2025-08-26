import {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} from './__utils__/automate.js';
import {
    itAsync, assert,
    DELETE_SUCCESSFUL,
    ITEM_NOT_FOUND
} from './imports.js';

console.log('------FIND_ONE_AND_DELETE------');
await itAsync('Deletes appropriate object', async () => {
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

    await ModelType.findOneAndDelete({ _id: model3._id });
    
    const models = await ModelType.find();
    const model3Exists = await ModelType.findById(model3._id);

    assert(models.length === 3);
    assert(models[2].prop !== model3.prop);
    assert(model3Exists === null);

}, cleanDatabase);
await itAsync('Returns "Deletion successful" message if deletion is successful', async () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1, false);

    const [ model ] = getModelInstances(1, ModelType, propsArr);

    await model.save();

    const res = await ModelType.findOneAndDelete({ _id: model._id });
    
    assert(res.message === DELETE_SUCCESSFUL);

}, cleanDatabase);
await itAsync('Returns "Item was not found" message if no object is found', async () => {
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

    const res = await ModelType.findOneAndDelete({ _id: '_id' });
    
    assert(res.message === ITEM_NOT_FOUND);

}, cleanDatabase);
await itAsync('Returns null if no arguments are passed', async () => {
    const ModelType = setupSchema();

    const res = await ModelType.findOneAndDelete();

    assert(res === null);
}, cleanDatabase);
