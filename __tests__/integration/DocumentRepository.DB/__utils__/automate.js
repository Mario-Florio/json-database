import {
    DocumentRepository,
    Document,
    Result,
    deepEqual
} from '../imports.js';
import fs from 'fs';

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

async function getTargetDoc(docRepo, options = { index: { isTrue: false, value: new Number() } }) {
    const { data } = await docRepo.read();
    const documents = data;
    const amount = documents.length;

    if (options.index.isTrue && (options.index.value >= amount || options.index.value < 0))
        throw new Error(`Invalid index value — ${options.index.value} is outside bounds of document repository`);

    const randomNum = Math.floor(Math.random() * amount);
    const targetDoc = documents[randomNum];

    return targetDoc;
}

async function getAndSetupDocRepo(options = { fill: { isTrue: false, amount: 10 } }) {
    const docRepo = getDocRepo();
    await docRepo.instantiate();
    if (options.fill.isTrue) await fillDocRepo(docRepo, options.fill.amount);
    return docRepo;
}

async function fillDocRepo(docRepo, amount = 10) {
    for (let i = 0; i < amount; i++) {
        const doc = getDoc({ prop: `item ${i+1}` });
        await docRepo.create(doc);
    }
}

function isDocument(document) {
    return document instanceof Document;
}

function isResult(result) {
    return result instanceof Result;
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

export {
    getDocRepo,
    getDoc,
    getTargetDoc,
    getAndSetupDocRepo,
    fillDocRepo,
    isDocument,
    isResult,
    dbFileExists,
    dbHas,
    cleanDatabase
}