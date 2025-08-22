import fs from 'fs';
import {
    Document,
    Schema,
    Result,
    config,
    deepEqual
} from '../import.js';

const dbPath = process.env.DBPATH || config.DBPATH;
const collectionName = 'e2e-test';
const collectionDbPath = `${dbPath}${collectionName}.json`;

const types = [
    undefined,
    null,
    new String(),
    new Boolean(),
    new Number(),
    new Array(),
    new Object()
];

function getCollectionId() {
    return collectionName;
}

function getSchema() {
    return new Schema({ prop: { type: 'string', required: true } });
}

function getTargetDoc(options = { index: { isTrue: false, value: new Number() } }) {
    if (!fileExists()) throw new Error('Test Error: Database has not been instantiated');

    const json = fs.readFileSync(collectionDbPath, 'utf-8');
    const documents = JSON.parse(json);
    const amount = documents.length;

    if (options.index.isTrue && (options.index.value >= amount || options.index.value < 0))
        throw new Error(`Test Error: Invalid index value — ${options.index.value} is outside bounds of database`);

    const randomNum = Math.floor(Math.random() * amount);
    const targetDoc = documents[randomNum];

    return targetDoc;
}

function fillDb(options = { amount: 10 }) {
    if (!fileExists()) throw new Error('Test Error: Database has not been instantiated');
    const data = [];
    for (let i = 0; i < options.amount; i++)
        data.push(new Document({
            _id: uid(),
            createdAt: new Date().toString(),
            prop: `Document ${i}`
        }));
    fs.writeFileSync(collectionDbPath, JSON.stringify(data));
}

function dbHas(document) {
    const json = fs.readFileSync(collectionDbPath, 'utf-8');
    const data = JSON.parse(json);
    for (const doc of data) {
        if (deepEqual(doc, document)) return true;
    }
    return false;
}

function fileExists() {
    return fs.existsSync(collectionDbPath);
}

function isResultObject(res) {
    return res instanceof Result;
}

function isDocument(doc) {
    return doc instanceof Document;
}

function cleanDatabase() {
    if (fs.existsSync(collectionDbPath)) {
        fs.unlinkSync(collectionDbPath);
    }
}

// UTILS
function uid() {
    const uid = Date.now().toString(36) +
        Math.random().toString(36).substring(2).padStart(12, 0);
        
    return uid;
}

export {
    types,
    getCollectionId,
    getSchema,
    getTargetDoc,
    fillDb,
    dbHas,
    fileExists,
    isResultObject,
    isDocument,
    cleanDatabase
}