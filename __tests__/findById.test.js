const createModel = require('../ODM/ODM.js');
const { it, assert } = require('./__utils__/test-tools.js');
const { collectionName, cleanDatabase } = require('./__utils__/automate.js');

cleanDatabase();

console.log('------FIND_BY_ID------');
it('Returns appropriate obj', () => {
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

    const model = ModelType.findById(model3._id);

    assert(model.prop === 'model 3');

}, cleanDatabase);
it('Returns null if no _id is passed', () => {
    const Model = createModel(collectionName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }

    const res = ModelType.findById();

    assert(res === null);
}, cleanDatabase);
it('Returns null if no object is found', () => {
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

    const res = ModelType.findById('sldkjvb');

    assert(res === null);

}, cleanDatabase);
