const documentController = require('../../../adapters/controllers/DocumentController.js');
const Document = require('../../../core/entities/Document.js');
const Schema = require('../../../core/entities/Schema.js');
const config = require('../../../config.js')
const isObject = require('../../../shared/__utils__/isObject.js');
const { it, assert } = require('../../../shared/testing/test-tools.js');

const CREATE = 'create';
const GET = 'get';
const GETONE = 'getOne';
const UPDATE = 'update';
const DELETE = 'delete';

module.exports = {
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