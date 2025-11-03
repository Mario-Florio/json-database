import Document from '../../../src/core/entities/Document.js';
import Operation from '../../../src/core/entities/Operation.js';
import Result from '../../../src/core/entities/Result.js';
import Schema from '../../../src/core/entities/Schema.js';
import DocumentRepoUseCase from '../../../src/core/use-cases/UseCase.js';
import FindDocuments from '../../../src/core/use-cases/FindDocuments.js';
import FindOneDocument from '../../../src/core/use-cases/FindOneDocument.js';
import SaveDocument from '../../../src/core/use-cases/SaveDocument.js';
import UpdateDocument from '../../../src/core/use-cases/UpdateDocument.js';
import IDocumentRepository from '../../../src/core/ports/IDocumentRepository.js';
import implementsInterface from '../../../src/core/use-cases/__utils__/implementsInterface.js';
import isObject from '../../../src/shared/__utils__/isObject.js';

const FIND = 'find';
const FIND_ONE = 'findOne';
const SAVE = 'save';
const UPDATE = 'update';

export {
    Document,
    Operation,
    Result,
    Schema,
    DocumentRepoUseCase,
    FindDocuments,
    FindOneDocument,
    SaveDocument,
    UpdateDocument,
    IDocumentRepository,
    implementsInterface,
    isObject,
    FIND,
    FIND_ONE,
    SAVE,
    UPDATE,
};
