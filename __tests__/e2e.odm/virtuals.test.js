import {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
} from './__utils__/automate.js';

describe('VIRTUALS', () => {

    afterEach(() => cleanDatabase());

    it('Virtuals work', async () => {
        const ModelType = setupSchema();
        const propsArr = getPropsArr(1, false);

        const [ model ] = getModelInstances(1, ModelType, propsArr);

        await model.save();

        expect(model.virtualProp).toBe('This is a virtual prop from model.');

    });
    it('Virtuals work on queried data: find', async () => {
        const ModelType = setupSchema();
        const propsArr = getPropsArr(2);

        const [
            model1,
            model2
        ] = getModelInstances(2, ModelType, propsArr);

        await model1.save();
        await model2.save();

        const models = await ModelType.find();

        expect(models[0].virtualProp).toBe('This is a virtual prop from model 1.');
        expect(models[1].virtualProp).toBe('This is a virtual prop from model 2.');

        const model = await ModelType.find(model1);

        expect(model[0].virtualProp).toBe('This is a virtual prop from model 1.');

    });
    it('Virtuals work on queried data: findById', async () => {
        const ModelType = setupSchema();
        const propsArr = getPropsArr(1);

        const [ model1 ] = getModelInstances(1, ModelType, propsArr);

        await model1.save();

        const model = await ModelType.findById(model1._id);

        expect(model.virtualProp).toBe('This is a virtual prop from model 1.');

    });
    it('Virtuals work on queried data: findOne', async () => {
        const ModelType = setupSchema();
        const propsArr = getPropsArr(1);

        const [ model1 ] = getModelInstances(1, ModelType, propsArr);

        await model1.save();

        const model = await ModelType.findOne(model1);

        expect(model.virtualProp).toBe('This is a virtual prop from model 1.');

    });
});
