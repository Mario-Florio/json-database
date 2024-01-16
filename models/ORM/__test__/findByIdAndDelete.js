const createModel = require('../Model.js');
const fs = require('fs');
const { dbName, it, assert, arraysEqual } = require('./utils.js');

if (fs.existsSync(dbName)) {
    fs.unlinkSync(dbName);
}

console.log('------FIND_BY_ID_AND_DELETE------');
it('Deletes appropriate object', () => {
    const Model = createModel(dbName);
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

    ModelType.findByIdAndDelete(model3._id);
    
    const models = ModelType.find();

    assert(models.length === 3);
    assert(models[2].prop !== model3.prop);

    fs.unlinkSync(ModelType.DB.dbName);
});
it('Returns "Deletion successful" if deletion is successful', () => {
    const Model = createModel(dbName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }
    const model = new ModelType('model')
    model.save();

    const res = ModelType.findByIdAndDelete(model._id);
    
    assert(res === 'Deletion successful');

    fs.unlinkSync(ModelType.DB.dbName);
});
it('Returns "Item was not found" if no object is found', () => {
    const Model = createModel(dbName);
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

    const res = ModelType.findByIdAndDelete('sldkjvb');
    
    assert(res === 'Item was not found');

    fs.unlinkSync(ModelType.DB.dbName);
});
it('Returns "Database does not exist" if database file does not exist', () => {
    const Model = createModel(dbName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }

    const res = ModelType.findByIdAndDelete('_id');
    
    assert(res === 'Database does not exist');
});
it('Returns "No item id was supplied" if no object _id is given', () => {
    const Model = createModel(dbName);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
    }

    const res = ModelType.findByIdAndDelete();
    
    assert(res === 'No item id was supplied');
});
