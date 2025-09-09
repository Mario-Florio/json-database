import {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} from './__utils__/automate.js';

describe('FIND', () => {

    afterEach(() => cleanDatabase());

    it('Returns appropriate obj', async () => {
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
        expect(model[0].prop).toBe(model1.prop);
        expect(model[0].createdAt).toBe(model1.createdAt);
        expect(model[0]._id).toBe(model1._id);

        // prop
        model = await ModelType.find({ prop: model2.prop });
        expect(model[0].prop).toBe(model2.prop);
        expect(model[0].createdAt).toBe(model2.createdAt);
        expect(model[0]._id).toBe(model2._id);

        // _id & prop
        model = await ModelType.find({ _id: model3._id, prop: model3.prop });
        expect(model[0].prop).toBe(model3.prop);
        expect(model[0].createdAt).toBe(model3.createdAt);
        expect(model[0]._id).toBe(model3._id);

    });
    it('Returns all data if no arguments are passed', async () => {
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

        expect(models.length).toBe(4);

        expect(models[0].prop).toBe(model1.prop);
        expect(models[0].createdAt).toBe(model1.createdAt);
        expect(models[0]._id).toBe(model1._id);

        expect(models[1].prop).toBe(model2.prop);
        expect(models[1].createdAt).toBe(model2.createdAt);
        expect(models[1]._id).toBe(model2._id);

        expect(models[2].prop).toBe(model3.prop);
        expect(models[2].createdAt).toBe(model3.createdAt);
        expect(models[2]._id).toBe(model3._id);

        expect(models[3].prop).toBe(model4.prop);
        expect(models[3].createdAt).toBe(model4.createdAt);
        expect(models[3]._id).toBe(model4._id);

    });
    it('Returns empty array if classKeys are passed and no object is found', async () => {
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

        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBe(0);

    });
    it('Returns empty array if database is empty', async () => {
        const ModelType = setupSchema();
        const propsArr = getPropsArr(1);

        const [ model1 ] = getModelInstances(1, ModelType, propsArr);
        
        await model1.save();
        await ModelType.findByIdAndDelete(model1._id);

        let res = await ModelType.find();
        
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBe(0);

        res = await ModelType.find({ _id: 'kldsjvb' });
        
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBe(0);

    });
});
