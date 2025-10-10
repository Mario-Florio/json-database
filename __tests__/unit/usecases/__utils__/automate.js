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
import LogTaskDispatcherDouble from './LogTaskDispatcherDouble.js';

async function setupUseCase(type) {
    const repo = new DocumentRepositoryDouble();
    const logTaskDispatcher = new LogTaskDispatcherDouble();
    const operationObj = new Operation({
        type: Operation.types.INSTANTIATE_COLLECTION,
        collectionId: '',
        payload: {},
    });
    await repo.instantiate(operationObj);
    await fillRepo(repo);

    switch (type) {
        case FIND:
            return new FindDocuments(repo, logTaskDispatcher);
        case FIND_ONE:
            return new FindOneDocument(repo, logTaskDispatcher);
        case SAVE:
            return new SaveDocument(repo, logTaskDispatcher);
        case UPDATE:
            return new UpdateDocument(repo, logTaskDispatcher);
        default:
            return null;
    }
}

async function getTargetDoc(
    repo,
    options = { index: { isTrue: false, value: new Number() } },
) {
    const operationObj = new Operation({
        type: Operation.types.GET_DOCUMENTS,
        collectionId: '',
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
            type: Operation.types.INSTANTIATE_COLLECTION,
            collectionId: '',
            payload: { document },
        });
        await repo.create(operationObj);
    }
}

export { setupUseCase, getTargetDoc, isDocument, getSchema, getDoc };
