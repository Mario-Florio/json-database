import {
    DocumentRepository,
    Document,
    Result,
    Operation,
    config,
    deepEqual,
    uid,
} from '../imports.js';
import fs from 'fs';

const dbPath = config.DBPATH;
const collectionName = 'docrepo-db-test' + uid();
const collectionDbPath = `${dbPath}${collectionName}.ndjson`;

function getDocRepo() {
    const docRepo = new DocumentRepository(collectionName);
    return docRepo;
}

function getDoc(data) {
    return new Document(data);
}

function getOperationObj(type, payload = {}) {
    return new Operation({
        type,
        collectionId: collectionName,
        payload,
    });
}

async function getTargetDoc(
    docRepo,
    options = { index: { isTrue: false, value: new Number() } },
) {
    const operationObj = getOperationObj(Operation.types.GET_DOCUMENTS);
    const response = await docRepo.read(operationObj);

    const documents = [];
    for await (const doc of response.gen) documents.push(doc);

    const amount = documents.length;

    if (
        options.index.isTrue &&
        (options.index.value >= amount || options.index.value < 0)
    )
        throw new Error(
            `Invalid index value — ${options.index.value} is outside bounds of document repository`,
        );

    const randomNum = Math.floor(Math.random() * amount);
    const targetDoc = documents[randomNum];

    return targetDoc;
}

async function getAndSetupDocRepo(
    options = { fill: { isTrue: false, amount: 10 } },
) {
    const operationObj = getOperationObj(
        Operation.types.INSTANTIATE_COLLECTION,
        {},
    );
    const docRepo = getDocRepo();
    await docRepo.instantiate(operationObj);
    if (options.fill.isTrue) await fillDocRepo(docRepo, options.fill.amount);
    return docRepo;
}

async function fillDocRepo(docRepo, amount = 10) {
    for (let i = 0; i < amount; i++) {
        const document = getDoc({ prop: `item ${i + 1}` });

        const operationObj = getOperationObj(Operation.types.CREATE_DOCUMENT, {
            document,
        });

        await docRepo.create(operationObj);
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

async function dbHas(document) {
    const ndjson = fs.readFileSync(collectionDbPath, 'utf-8');
    const data = parseNDJSON(ndjson);
    for (const doc of data) {
        if (deepEqual(document, doc)) return true;
    }

    return false;
}

function cleanDatabase() {
    if (fs.existsSync(collectionDbPath)) {
        fs.unlinkSync(collectionDbPath);
    }
}

// UTILS
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
    getDocRepo,
    getDoc,
    getOperationObj,
    getTargetDoc,
    getAndSetupDocRepo,
    fillDocRepo,
    isDocument,
    isResult,
    dbFileExists,
    dbHas,
    cleanDatabase,
};
