const IDocumentRepository = require('../../ports/IDocumentRepository.js');
const DocumentRepoUseCase = require('../UseCase.js');
const FindDocuments = require('../FindDocuments.js');
const FindOneDocument = require('../FindOneDocument.js');
const SaveDocument = require('../SaveDocument.js');
const UpdateDocument = require('../UpdateDocument.js');
const Document = require('../../entities/Document.js');
const Schema = require('../../entities/Schema.js');
const implementsInterface = require('../__utils__/implementsInterface.js');
const isObject = require('../../../shared/__utils__/isObject.js');
const { it, assert } = require('../../../shared/testing/test-tools.js');

const FIND = 'find';
const FIND_ONE = 'findOne';
const SAVE = 'save';
const UPDATE = 'update';

module.exports = {
    IDocumentRepository,
    DocumentRepoUseCase,
    FindDocuments,
    FindOneDocument,
    SaveDocument,
    UpdateDocument,
    Document,
    Schema,
    implementsInterface,
    isObject,
    FIND,
    FIND_ONE,
    SAVE,
    UPDATE,
    it,
    assert
}