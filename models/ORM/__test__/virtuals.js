const createModel = require('../Model.js');
const fs = require('fs');
const { it, assert, arraysEqual } = require('./utils.js');

if (fs.existsSync('./models/ORM/__test__/db-test')) {
    fs.unlinkSync('./models/ORM/__test__/db-test');
}

console.log('------VIRTUALS------');
it('Virtuals work', () => {
    const Model = createModel('./models/ORM/__test__/db-test');
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
        get virtualProp() {
            return `This is a virtual prop from ${this.prop}.`;
        }
    }

    const model = new ModelType('model');
    model.save();

    assert(model.virtualProp === "This is a virtual prop from model.")

    fs.unlinkSync(Model.DB.dbName);
});
it('Virtuals work on queried data: find', () => {
    const Model = createModel('./models/ORM/__test__/db-test');
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
        get virtualProp() {
            return `This is a virtual prop from ${this.prop}.`;
        }
    }
    ModelType.setupModel(ModelType);

    const model1 = new ModelType('model 1');
    model1.save();
    const model2 = new ModelType('model 2');
    model2.save();

    const models = ModelType.find();

    assert(models[0].virtualProp === "This is a virtual prop from model 1.");
    assert(models[1].virtualProp === "This is a virtual prop from model 2.");

    const model = ModelType.find(model1);

    assert(model[0].virtualProp === "This is a virtual prop from model 1.");

    fs.unlinkSync(Model.DB.dbName);
});
it('Virtuals work on queried data: findById', () => {
    const Model = createModel('./models/ORM/__test__/db-test');
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
        get virtualProp() {
            return `This is a virtual prop from ${this.prop}.`;
        }
    }
    ModelType.setupModel(ModelType);

    const model1 = new ModelType('model 1');
    model1.save();

    const model = ModelType.findById(model1._id);

    assert(model.virtualProp === "This is a virtual prop from model 1.");

    fs.unlinkSync(Model.DB.dbName);
});
it('Virtuals work on queried data: findOne', () => {
    const Model = createModel('./models/ORM/__test__/db-test');
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
        get virtualProp() {
            return `This is a virtual prop from ${this.prop}.`;
        }
    }
    ModelType.setupModel(ModelType);

    const model1 = new ModelType('model 1');
    model1.save();

    const model = ModelType.findOne(model1);

    assert(model.virtualProp === "This is a virtual prop from model 1.");

    fs.unlinkSync(Model.DB.dbName);
});
