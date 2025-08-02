const ODM = require('../../ODM/ODM.js');
const fs = require('fs');

const dbPath = process.env.DBPATH || './database/collections/';
const collectionName = 'db-test';
const collectionDbPath = `${dbPath}${collectionName}.json`;

function setupSchema() {
    const Schema = ODM.Schema;

    const SchemaType = new Schema({
        prop: { type: 'string', required: true }
    });

    const Model = ODM.model(collectionName, SchemaType);
    class ModelType extends Model {
        constructor(prop) {
            super();
            this.prop = prop;
        }
        get virtualProp() {
            return `This is a virtual prop from ${this.prop}.`;
        }
    }
    Model.setupModel(ModelType);

    return ModelType;
}

function getModelInstances(amount, ModelType, props) {
    const models = [];
    for (let i = 0; i < amount; i++) {
        const propsArr = Object.values(props[i]);
        const model = new ModelType(...propsArr);
        models.push(model);
    }
    return models;
}

function getPropsArr(amount, numbered = true) {
    const propsArr = [];
    for (let i = 0; i < amount; i++) {
        if (numbered) {
            propsArr.push({ prop: `model ${i+1}` });
        } else {
            propsArr.push({ prop: 'model' });
        }
    }
    return propsArr;
}

function cleanDatabase() {
    if (fs.existsSync(collectionDbPath)) {
        fs.unlinkSync(collectionDbPath);
    }
}

module.exports = {
    setupSchema,
    getModelInstances,
    getPropsArr,
    cleanDatabase
}