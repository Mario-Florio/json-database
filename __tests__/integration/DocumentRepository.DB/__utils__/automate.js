const {
    DocumentRepository,
    Document
} = require('../imports.js');
const fs = require('fs');

const dbPath = process.env.DBPATH || './database/collections/';
const collectionName = 'docrepo-db-test';
const collectionDbPath = `${dbPath}${collectionName}.json`;

function getDocRepo() {
    const docRepo = new DocumentRepository(collectionName);
    return docRepo;
}

function getDoc(data) {
    return new Document(data);
}

function getTargetDoc(docRepo, options = { index: { isTrue: false, value: new Number() } }) {
    const documents = docRepo.read();
    const amount = documents.length;

    if (options.index.isTrue && (options.index.value >= amount || options.index.value < 0))
        throw new Error(`Invalid index value — ${options.index.value} is outside bounds of document repository`);

    const randomNum = Math.floor(Math.random() * amount);
    const targetDoc = documents[randomNum];

    return targetDoc;
}

function getAndSetupDocRepo(options = { fill: { isTrue: false, amount: 10 } }) {
    const docRepo = getDocRepo();
    docRepo.instantiate();
    if (options.fill.isTrue) fillDocRepo(docRepo, options.fill.amount);
    return docRepo;
}

function fillDocRepo(docRepo, amount = 10) {
    for (let i = 0; i < amount; i++) {
        const uid = (new Date().getUTCMilliseconds() + i * (Math.floor(Math.random() * 100) + 1)).toString();
        const doc = getDoc({ _id: uid, prop: `item ${i+1}` });
        docRepo.create(doc);
    }
}

function isDocument(document) {
    return document instanceof Document;
}

function dbFileExists() {
    return fs.existsSync(collectionDbPath);
}

function dbHas(document) {
    const json = fs.readFileSync(collectionDbPath, 'utf-8');
    const data = JSON.parse(json);

    return data.some(obj => deepEqual(document, obj));
}

function cleanDatabase() {
    if (fs.existsSync(collectionDbPath)) {
        fs.unlinkSync(collectionDbPath);
    }
}

// UTILS
function deepEqual(a, b) {
    if (a === b) return true;

    if (typeof a !== 'object' || a === null ||
        typeof b !== 'object' || b === null) {
        return false; // primitives or mismatched types
    }

    if (Array.isArray(a) !== Array.isArray(b)) return false;

    if (Array.isArray(a)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
    }

    // For plain objects
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (const key of aKeys) {
        if (!b.hasOwnProperty(key)) return false;
        if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
}

module.exports = {
    getDocRepo,
    getDoc,
    getTargetDoc,
    getAndSetupDocRepo,
    fillDocRepo,
    isDocument,
    dbFileExists,
    dbHas,
    cleanDatabase
}