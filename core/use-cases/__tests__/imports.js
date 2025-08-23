import IDocumentRepository from '../../ports/IDocumentRepository.js';
import DocumentRepoUseCase from '../UseCase.js';
import FindDocuments from '../FindDocuments.js';
import FindOneDocument from '../FindOneDocument.js';
import SaveDocument from '../SaveDocument.js';
import UpdateDocument from '../UpdateDocument.js';
import Document from '../../entities/Document.js';
import Schema from '../../entities/Schema.js';
import implementsInterface from '../__utils__/implementsInterface.js';
import isObject from '../../../shared/__utils__/isObject.js';
import { it, itAsync, assert } from '../../../shared/testing/test-tools.js';

const FIND = 'find';
const FIND_ONE = 'findOne';
const SAVE = 'save';
const UPDATE = 'update';

export {
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
    it, itAsync,
    assert
}