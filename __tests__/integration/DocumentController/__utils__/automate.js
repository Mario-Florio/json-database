import {
    documentController,
    Document,
    config,
    CREATE,
    GET,
    GETONE,
    UPDATE,
    DELETE,
    isObject
} from '../imports.js';
import fs from 'fs';

const dbPath = process.env.DBPATH || config.DBPATH;
const collectionName = 'controllers-db-test';
const collectionDbPath = `${dbPath}${collectionName}.json`;

function instantiateCollection() {
    const collectionId = collectionName;
    documentController.instantiateCollection({ collectionId });
    return collectionId;
}

function isDocument(document) {
    return document instanceof Document;
}

function runInvalidProps(controllerType, paramObj, paramObjSchema) {
    const controller = getController(controllerType);
    const responses = [];

    for (const key of Object.keys(paramObj)) {
        const paramObjCopy = getShallowCopy(paramObj);

        const validType = paramObjSchema[key];
        paramObjCopy[key] = getInvalidProp(validType);

        const response = controller(paramObjCopy);

        responses.push(response);
    }

    return responses;
}

function isValidResponse(response) {
    if (!isObject(response)) return false;
    if (response.message === undefined || typeof response.message !== 'string') return false;
    if (response.success === undefined && typeof response.success !== 'boolean') return false;
    return true;
}


function cleanDatabase() {
    if (fs.existsSync(collectionDbPath)) {
        fs.unlinkSync(collectionDbPath);
    }
}

// UTILS
function getController(type) {
    switch(type) {
        case CREATE:
            return documentController.createDocument;
        case GET:
            return documentController.getDocuments;
        case GETONE:
            return documentController.getOneDocument;
        case UPDATE:
            return documentController.updateDocument;
        case DELETE:
            return documentController.deleteDocument;
        default:
            return null;
    }
}

function getShallowCopy(obj) {
    const duplicate = {};
    for (const key of Object.keys(obj)) {
        duplicate[key] = obj[key];
    }
    return duplicate;
}

function getInvalidProp(type) {
    switch(type) {
        case 'string':
            return 1;
        case 'object':
            return 1;
        case 'boolean':
            return 'not boolean'
        case 'schema':
            return 1;
        case 'null':
            return true;
        default:
            return null;
    }
}

export {
    instantiateCollection,
    runInvalidProps,
    isValidResponse,
    isDocument,
    cleanDatabase
}