import {
    setupSchema,
    cleanDatabase,
    getPropsArr,
    getModelInstances
} from './__utils__/automate.js';
import {
    DELETE_SUCCESSFUL,
    ITEM_NOT_FOUND
} from './imports.js';

describe('FIND BY ID AND DELETE', () => {

    afterEach(() => cleanDatabase());

    it('Deletes appropriate object', async () => {
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

        await ModelType.findByIdAndDelete(model3._id);
        
        const models = await ModelType.find();
        const model3Exists = await ModelType.findById(model3._id);

        expect(models.length).toBe(3);
        expect(models[2].prop !== model3.prop).toBe(true);
        expect(model3Exists).toBe(null);

    });
    it('Returns "Deletion successful" message if deletion is successful', async () => {
        const ModelType = setupSchema();
        const propsArr = getPropsArr(1);

        const [ model1 ] = getModelInstances(1, ModelType, propsArr);
        await model1.save();

        const res = await ModelType.findByIdAndDelete(model1._id);

        expect(res.message).toBe(DELETE_SUCCESSFUL);

    });
    it('Returns "Item was not found" message if no object is found', async () => {
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

        const res = await ModelType.findByIdAndDelete('sldkjvb');

        expect(res.message).toBe(ITEM_NOT_FOUND);
    });
    it('Returns null message if no object _id is given', async () => {
        const ModelType = setupSchema();

        const res = await ModelType.findByIdAndDelete();
        
        expect(res).toBe(null);
    });
});
