const createModel = require('../Model.js');
const fs = require('fs');
const { it, assert, arraysEqual } = require('./utils.js');

console.log('------FIND_ONE------');
it('Returns appropriate obj', () => {
    const Model = createModel('./models/ORM/__test__/db-test');
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

    fs.unlinkSync(ModelType.DB.dbName);
});
it('Returns first obj which meets criteria (in order of created first)', () => {
    const Model = createModel('./models/ORM/__test__/db-test');
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

    fs.unlinkSync(ModelType.DB.dbName);
});
it('Returns null if no object is found', () => {
    const Model = createModel('./models/ORM/__test__/db-test');
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

    fs.unlinkSync(ModelType.DB.dbName);
});
it('Returns null database does not exist', () => {
    const Model = createModel('./models/ORM/__test__/db-test');
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }

    const res = ModelType.findOne({ _id: 'sdajvkbiu' });

    assert(res === null);
});
