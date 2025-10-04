import {
    FindDocuments,
    FindOneDocument,
    SaveDocument,
    UpdateDocument,
    Document,
    Schema,
    Operation,
    FIND,
    FIND_ONE,
    SAVE,
    UPDATE,
} from '../imports.js';
import DocumentRepositoryDouble from './DocRepoDouble.js';
import logEventEmitterDouble from './LogEventsDouble.js';

async function setupUseCase(type) {
    const repo = new DocumentRepositoryDouble();
    await repo.instantiate();
    await fillRepo(repo);

    switch (type) {
        case FIND:
            return new FindDocuments(repo, logEventEmitterDouble);
        case FIND_ONE:
            return new FindOneDocument(repo, logEventEmitterDouble);
        case SAVE:
            return new SaveDocument(repo, logEventEmitterDouble);
        case UPDATE:
            return new UpdateDocument(repo, logEventEmitterDouble);
        default:
            return null;
    }
}

async function getTargetDoc(
    repo,
    options = { index: { isTrue: false, value: new Number() } },
) {
    const operationObj = new Operation({
        type: Operation.TYPES.GET_DOCUMENTS,
        payload: {},
    });
    const response = await repo.read(operationObj);

    const documents = [];
    for (const doc of response.gen) documents.push(doc);

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

function isDocument(document) {
    return document instanceof Document;
}

function getSchema() {
    const schema = new Schema({
        prop: { type: 'string', required: true },
    });
    return schema;
}

function getDoc(data) {
    return new Document(data);
}

// UTILS
async function fillRepo(repo, amount = 10) {
    for (let i = 0; i < amount; i++) {
        const document = getDoc({ prop: `item ${i + 1}` });
        const operationObj = new Operation({
            type: Operation.TYPES.CREATE_DOCUMENT,
            payload: { document },
        });
        await repo.create(operationObj);
    }
}

export { setupUseCase, getTargetDoc, isDocument, getSchema, getDoc };
