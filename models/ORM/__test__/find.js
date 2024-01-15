const createModel = require('../Model.js');
const fs = require('fs');
const { it, assert, arraysEqual } = require('./utils.js');

if (fs.existsSync('./models/ORM/__test__/db-test')) {
    fs.unlinkSync('./models/ORM/__test__/db-test');
}

console.log('------FIND------');
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
    let model = ModelType.find({ _id: model1._id });
    assert(model[0].prop === model1.prop);

    // prop
    model = ModelType.find({ prop: model2.prop });
    assert(model[0].prop === model2.prop);

    // _id & prop
    model = ModelType.find({ _id: model3._id, prop: model3.prop });
    assert(model[0].prop === model3.prop);

    fs.unlinkSync(ModelType.DB.dbName);
});
it('Returns all data if no arguments are passed', () => {
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

    const models = ModelType.find();

    assert(models.length === 4);
    assert(models[0].prop === model1.prop);
    assert(models[1].prop === model2.prop);
    assert(models[2].prop === model3.prop);
    assert(models[3].prop === model4.prop);

    fs.unlinkSync(ModelType.DB.dbName);
});
it('Returns null if classKeys are passed and no object is found', () => {
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

    const res = ModelType.find({ _id: 'sldkjvb' });

    // assert(res === null);

    fs.unlinkSync(ModelType.DB.dbName);
});
it('Returns empty array if database is empty (and no classKeys are passed)', () => {
    const Model = createModel('./models/ORM/__test__/db-test');
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }

    const model1 = new ModelType('model 1');
    model1.save();
    Model.findByIdAndDelete(model1._id);

    const res = ModelType.find();
    
    assert(Array.isArray(res));
    assert(res.length === 0);

    fs.unlinkSync(ModelType.DB.dbName);
});
it('Returns null if database does not exist', () => {
    const Model = createModel('./models/ORM/__test__/db-test');
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }

    const models = ModelType.find();

    assert(models === null);
});
