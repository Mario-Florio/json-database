const createModel = require('../ODM/ODM.js');
const { it, assert } = require('./__utils__/test-tools.js');
const { collectionName, cleanDatabase } = require('./__utils__/automate.js');

cleanDatabase();

console.log('------FIND_ONE_AND_DELETE------');
it('Deletes appropriate object', () => {
    const Model = createModel(collectionName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }
    const model1 = new ModelType('model 1')
    model1.save();
    const model2 = new ModelType('model 2')
    model2.save();
    const model3 = new ModelType('model 3')
    model3.save();
    const model4 = new ModelType('model 4')
    model4.save();

    ModelType.findOneAndDelete({ _id: model3._id });
    
    const models = ModelType.find();

    assert(models.length === 3);
    assert(models[2].prop !== model3.prop);

}, cleanDatabase);
it('Returns "Deletion successful" if deletion is successful', () => {
    const Model = createModel(collectionName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }
    const model = new ModelType('model')
    model.save();

    const res = ModelType.findOneAndDelete({ _id: model._id });
    
    assert(res.message === 'Deletion successful');

}, cleanDatabase);
it('Returns "Item was not found" if no object is found', () => {
    const Model = createModel(collectionName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }
    const model1 = new ModelType('model 1')
    model1.save();
    const model2 = new ModelType('model 2')
    model2.save();
    const model3 = new ModelType('model 3')
    model3.save();
    const model4 = new ModelType('model 4')
    model4.save();

    const res = ModelType.findOneAndDelete({ _id: 'sldkjvb' });
    
    assert(res.message === 'Item was not found');

}, cleanDatabase);
it('Returns null if no arguments are passed', () => {
    const Model = createModel(collectionName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }

    const res = ModelType.findOneAndDelete();
    
    assert(res === null);
}, cleanDatabase);
