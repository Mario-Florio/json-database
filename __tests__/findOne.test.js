const createModel = require('../ODM/ODM.js');
const { it, assert } = require('./__utils__/test-tools.js');
const { collectionName, cleanDatabase } = require('./__utils__/automate.js');

cleanDatabase();

console.log('------FIND_ONE------');
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

    // _id
    let model = ModelType.findOne({ _id: model1._id });
    assert(model.prop === model1.prop);

    // prop
    model = ModelType.findOne({ prop: model2.prop });
    assert(model.prop === model2.prop);

    // _id & prop
    model = ModelType.findOne({ _id: model3._id, prop: model3.prop });
    assert(model.prop === model3.prop);

}, cleanDatabase);
it('Returns first obj which meets criteria (in order of created first)', () => {
    const Model = createModel(collectionName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }
    const model1 = new ModelType('model')
    model1.save();
    const model2 = new ModelType('model')
    model2.save();
    const model3 = new ModelType('model')
    model3.save();
    const model4 = new ModelType('model')
    model4.save();

    const model = ModelType.findOne({ prop: 'model' });

    assert(!model.length);
    assert(model._id === model1._id);

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

    const res = ModelType.findOne({ _id: 'sdajvkbiu' });

    assert(res === null);

}, cleanDatabase);
it('Returns null database does not exist', () => {
    const Model = createModel(collectionName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }

    const res = ModelType.findOne({ _id: 'sdajvkbiu' });

    assert(res === null);
}, cleanDatabase);
