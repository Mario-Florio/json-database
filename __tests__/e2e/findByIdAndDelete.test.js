import {
    setupSchema,
    cleanDatabase,
    getPropsArr,
    getModelInstances
} from './__utils__/automate.js';
import {
    it, assert,
    DELETE_SUCCESSFUL,
    ITEM_NOT_FOUND
} from './imports.js';

console.log('------FIND_BY_ID_AND_DELETE------');
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

    ModelType.findByIdAndDelete(model3._id);
    
    const models = ModelType.find();

    assert(models.length === 3);
    assert(models[2].prop !== model3.prop);

}, cleanDatabase);
it('Returns "Deletion successful" message if deletion is successful', () => {
    const ModelType = setupSchema();
    const propsArr = getPropsArr(1);

    const [ model1 ] = getModelInstances(1, ModelType, propsArr);
    model1.save();

    const res = ModelType.findByIdAndDelete(model1._id);

    assert(res.message === DELETE_SUCCESSFUL);

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

    const res = ModelType.findByIdAndDelete('sldkjvb');

    assert(res.message === ITEM_NOT_FOUND);
}, cleanDatabase);
it('Returns null message if no object _id is given', () => {
    const ModelType = setupSchema();

    const res = ModelType.findByIdAndDelete();
    
    assert(res === null);
});
