import { ODM, config, uid } from '../imports.js';
import fs from 'fs';

const dbPath = config.DBPATH;
const collectionName = 'db-test' + uid();
const collectionDbPath = `${dbPath}${collectionName}.ndjson`;

function setupSchema() {
    const Schema = ODM.Schema;

    const SchemaType = new Schema({
        prop: { type: 'string', required: true },
    });

    SchemaType.virtual('virtualProp').get(function () {
        return `This is a virtual prop from ${this.prop}.`;
    });

    const Model = ODM.model(collectionName, SchemaType);

    return Model;
}

function getModelInstances(amount, ModelType, props) {
    const models = [];
    for (let i = 0; i < amount; i++) {
        const model = new ModelType(props[i]);
        models.push(model);
    }
    return models;
}

function getPropsArr(amount, numbered = true) {
    const propsArr = [];
    for (let i = 0; i < amount; i++) {
        if (numbered) {
            propsArr.push({ prop: `model ${i + 1}` });
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

export { setupSchema, getModelInstances, getPropsArr, cleanDatabase };
