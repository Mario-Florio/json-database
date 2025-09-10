import IDocumentRepository from '../../../src/core/ports/IDocumentRepository.js';
import DocumentRepoUseCase from '../../../src/core/use-cases/UseCase.js';
import FindDocuments from '../../../src/core/use-cases/FindDocuments.js';
import FindOneDocument from '../../../src/core/use-cases/FindOneDocument.js';
import SaveDocument from '../../../src/core/use-cases/SaveDocument.js';
import UpdateDocument from '../../../src/core/use-cases/UpdateDocument.js';
import Document from '../../../src/core/entities/Document.js';
import Schema from '../../../src/core/entities/Schema.js';
import implementsInterface from '../../../src/core/use-cases/__utils__/implementsInterface.js';
import isObject from '../../../src/shared/__utils__/isObject.js';
import { it, itAsync, assert } from '../../../src/shared/testing/test-tools.js';

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