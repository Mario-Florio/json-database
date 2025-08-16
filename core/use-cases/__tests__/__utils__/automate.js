const {
    FindDocuments,
    FindOneDocument,
    SaveDocument,
    UpdateDocument,
    Document,
    Schema,
    FIND,
    FIND_ONE,
    SAVE,
    UPDATE
} = require('../imports.js');
const DocumentRepositoryDouble = require('./DocRepoDouble.js');

function setupUseCase(type, options = { fill: { isTrue: true, amount: 10 } }) {
    const repo = new DocumentRepositoryDouble();
    repo.instantiate();
    fillRepo(repo);

    switch (type) {
        case FIND:
            return new FindDocuments(repo);
        case FIND_ONE:
            return new FindOneDocument(repo);
        case SAVE:
            return new SaveDocument(repo);
        case UPDATE:
            return new UpdateDocument(repo);
        default:
            return null;
    }
}

function getTargetDoc(repo, options = { index: { isTrue: false, value: new Number() } }) {
    const documents = repo.read();
    const amount = documents.length;

    if (options.index.isTrue && (options.index.value >= amount || options.index.value < 0))
        throw new Error(`Invalid index value — ${options.index.value} is outside bounds of document repository`);

    const randomNum = Math.floor(Math.random() * amount);
    const targetDoc = documents[randomNum];

    return targetDoc;
}

function isDocument(document) {
    return document instanceof Document;
}

function getSchema() {
    const schema = new Schema({
        prop: { type: 'string', required: true }
    });
    return schema;
}

function getDoc(data) {
    const uid = (new Date().getUTCMilliseconds() + (Math.floor(Math.random() * 10) + 1) * (Math.floor(Math.random() * 100) + 1)).toString();
    return new Document({ _id: uid, ...data });
}

// UTILS
function fillRepo(repo, amount = 10) {
    for (let i = 0; i < amount; i++) {
        const doc = getDoc({ prop: `item ${i+1}` });
        repo.create(doc);
    }
}

module.exports = {
    setupUseCase,
    getTargetDoc,
    isDocument,
    getSchema,
    getDoc
}