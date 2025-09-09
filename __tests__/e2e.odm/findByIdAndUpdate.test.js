import {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase,
} from './__utils__/automate.js';

describe('FIND BY ID AND UPDATE', () => {
    afterEach(() => cleanDatabase());

    it('Update appropriate item with proper values', async () => {
        const ModelType = setupSchema();
        const propsArr = getPropsArr(2);

        const [model1, model2] = getModelInstances(2, ModelType, propsArr);

        await model1.save();
        await model2.save();

        const updatedProp = 'updated prop';
        await ModelType.findByIdAndUpdate(model2._id, { prop: updatedProp });

        const updatedModel2 = await ModelType.findById(model2._id);

        expect(updatedModel2.prop).toBe(updatedProp);
    });
    it('Does not update _id & createdAt fields', async () => {
        const ModelType = setupSchema();
        const propsArr = getPropsArr(1);

        const [model1] = getModelInstances(1, ModelType, propsArr);
        await model1.save();

        const updatedId = 'saldjbskjdvbsa';
        const updatedCreatedAt = new Date();
        await ModelType.findByIdAndUpdate(model1._id, {
            _id: updatedId,
            createdAt: updatedCreatedAt,
        });

        const updatedModel = await ModelType.findById(model1._id);

        expect(updatedModel._id).toBe(model1._id);
        expect(updatedModel.createdAt).toBe(model1.createdAt);
    });
    it('Returns null if no object is found', async () => {
        const ModelType = setupSchema();
        const propsArr = getPropsArr(2);

        const [model1, model2] = getModelInstances(2, ModelType, propsArr);

        await model1.save();
        await model2.save();

        const updatedProp = 'updated prop';
        const res = await ModelType.findByIdAndUpdate('sdjkvbsdv', {
            prop: updatedProp,
        });

        expect(res).toBe(null);
    });
    it('Returns null if no arguments are passed', async () => {
        const ModelType = setupSchema();
        const propsArr = getPropsArr(2);

        const [model1, model2] = getModelInstances(2, ModelType, propsArr);

        await model1.save();
        await model2.save();

        const res = await ModelType.findByIdAndUpdate();

        expect(res).toBe(null);
    });
});
