import fs from 'fs';
import {
    Document,
    Schema,
    Result,
    IO_SERVICE,
    config,
    deepEqual,
    uid,
} from '../import.js';

const dbPath = config.DBPATH;
const collectionName = 'e2e-test' + uid();
const collectionDbPath = `${dbPath}${collectionName}.ndjson`;

const types = [
    undefined,
    null,
    new String(),
    new Boolean(),
    new Number(),
    new Array(),
    new Object(),
];

function getCollectionId() {
    return collectionName;
}

function getSchema() {
    return new Schema({ prop: { type: 'string', required: true } });
}

function getTargetDoc(
    options = { index: { isTrue: false, value: new Number() } },
) {
    if (!fileExists())
        throw new Error('Test Error: Database has not been instantiated');

    const json = fs.readFileSync(collectionDbPath, 'utf-8');
    const documents = parseNDJSON(json);
    const amount = documents.length;

    if (
        options.index.isTrue &&
        (options.index.value >= amount || options.index.value < 0)
    )
        throw new Error(
            `Test Error: Invalid index value — ${options.index.value} is outside bounds of database`,
        );

    const randomNum = Math.floor(Math.random() * amount);
    const targetDoc = documents[randomNum];

    return targetDoc;
}

function fillDb(options = { amount: 10 }) {
    if (!fileExists())
        throw new Error('Test Error: Database has not been instantiated');
    for (let i = 0; i < options.amount; i++)
        fs.appendFileSync(
            collectionDbPath,
            JSON.stringify(new Document({ prop: `Document ${i}` })) + '\n',
        );
}

function dbHas(document) {
    const { _id, ...documentWithNoId } = document;
    const json = fs.readFileSync(collectionDbPath, 'utf-8');
    const data = parseNDJSON(json);
    for (const doc of data) {
        const { _id, ...docWithNoId } = doc;
        if (deepEqual(docWithNoId, documentWithNoId)) return true;
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

function parseNDJSON(json) {
    return json
        .split('\n')
        .map((line) => {
            if (!line.trim()) return null;
            return JSON.parse(line);
        })
        .filter((line) => line !== null);
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
    cleanDatabase,
};
