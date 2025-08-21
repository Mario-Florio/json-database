import documentController from '../../../adapters/controllers/DocumentController.js';
import Document from '../../../core/entities/Document.js';
import Schema from '../../../core/entities/Schema.js';
import config from '../../../config.js';
import isObject from '../../../shared/__utils__/isObject.js';
import { it, assert } from '../../../shared/testing/test-tools.js';

const CREATE = 'create';
const GET = 'get';
const GETONE = 'getOne';
const UPDATE = 'update';
const DELETE = 'delete';

export {
    documentController,
    Document,
    Schema,
    config,
    CREATE,
    GET,
    GETONE,
    UPDATE,
    DELETE,
    isObject,
    it,
    assert
}