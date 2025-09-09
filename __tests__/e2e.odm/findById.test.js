import {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase,
} from './__utils__/automate.js';

describe('FIND BY ID', () => {
    afterEach(() => cleanDatabase());

    it('Returns appropriate obj', async () => {
        const ModelType = setupSchema();
        const propsArr = getPropsArr(4);

        const [model1, model2, model3, model4] = getModelInstances(
            4,
            ModelType,
            propsArr,
        );

        await model1.save();
        await model2.save();
        await model3.save();
        await model4.save();

        const model = await ModelType.findById(model3._id);

        expect(model.prop).toBe(model3.prop);
        expect(model.createdAt).toBe(model3.createdAt);
        expect(model._id).toBe(model3._id);
    });
    it('Returns null if no _id is passed', async () => {
        const ModelType = setupSchema();

        const res = await ModelType.findById();

        expect(res).toBe(null);
    });
    it('Returns null if no object is found', async () => {
        const ModelType = setupSchema();
        const propsArr = getPropsArr(4);

        const [model1, model2, model3, model4] = getModelInstances(
            4,
            ModelType,
            propsArr,
        );

        await model1.save();
        await model2.save();
        await model3.save();
        await model4.save();

        const res = await ModelType.findById('sldkjvb');

        expect(res).toBe(null);
    });
});
