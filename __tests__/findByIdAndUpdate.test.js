const createModel = require('../ODM/ODM.js');
const { it, assert } = require('./__utils__/test-tools.js');
const { collectionName, cleanDatabase } = require('./__utils__/automate.js');

cleanDatabase();

console.log('------FIND_BY_ID_AND_UPDATE------');
it('Update appropriate item with proper values', () => {
    const Model = createModel(collectionName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }
    const model1 = new Model('model 1');
    model1.save();
    const model2 = new Model('model 2');
    model2.save();

    const updatedProp = 'updated prop';
    ModelType.findByIdAndUpdate(model2._id, { prop: updatedProp });

    const updatedModel2 = ModelType.findById(model2._id);

    assert(updatedModel2.prop === updatedProp);

}, cleanDatabase);
it('Does not update _id & createdAt fields', () => {
    const Model = createModel(collectionName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }
    const model = new Model('model 1');
    model.save();

    const updatedId = 'saldjbskjdvbsa';
    const updatedCreatedAt = new Date();
    ModelType.findByIdAndUpdate(model._id, { _id: updatedId, createdAt: updatedCreatedAt });

    const updatedModel = ModelType.findById(model._id);

    assert(updatedModel._id === model._id);
    assert(updatedModel.createdAt === model.createdAt);

}, cleanDatabase);
it('Returns null if no object is found', () => {
    const Model = createModel(collectionName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }
    const model1 = new Model('model 1');
    model1.save();
    const model2 = new Model('model 2');
    model2.save();

    const updatedProp = 'updated prop';
    const res = ModelType.findByIdAndUpdate('sdjkvbsdv', { prop: updatedProp });

    assert(res === null);

}, cleanDatabase);
it('Returns null if no arguments are passed', () => {
    const Model = createModel(collectionName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }
    const model1 = new Model('model 1');
    model1.save();
    const model2 = new Model('model 2');
    model2.save();

    const res = ModelType.findByIdAndUpdate();

    assert(res === null);

}, cleanDatabase);
it('Returns null if database does not exist', () => {
    const Model = createModel(collectionName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }

    const res = ModelType.findByIdAndUpdate();

    assert(res === null);
}, cleanDatabase);
