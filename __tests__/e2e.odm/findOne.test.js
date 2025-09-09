import {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase,
} from './__utils__/automate.js';

describe('FIND ONE', () => {
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

        // _id
        let model = await ModelType.findOne({ _id: model1._id });
        expect(model.prop).toBe(model1.prop);
        expect(model.createdAt).toBe(model1.createdAt);
        expect(model._id).toBe(model1._id);

        // prop
        model = await ModelType.findOne({ prop: model2.prop });
        expect(model.prop).toBe(model2.prop);
        expect(model.createdAt).toBe(model2.createdAt);
        expect(model._id).toBe(model2._id);

        // _id & prop
        model = await ModelType.findOne({ _id: model3._id, prop: model3.prop });
        expect(model.prop).toBe(model3.prop);
        expect(model.createdAt).toBe(model3.createdAt);
        expect(model._id).toBe(model3._id);
    });
    it('Returns first obj which meets criteria (in order of created first)', async () => {
        const ModelType = setupSchema();
        const propsArr = getPropsArr(4, false);

        const [model1, model2, model3, model4] = getModelInstances(
            4,
            ModelType,
            propsArr,
        );

        await model1.save();
        await model2.save();
        await model3.save();
        await model4.save();

        const model = await ModelType.findOne({ prop: 'model' });

        expect(model._id).toBe(model1._id);
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

        const res = await ModelType.findOne({ _id: 'sdajvkbiu' });

        expect(res).toBe(null);
    });
});
