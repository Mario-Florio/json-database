import Document from '../../../src/core/entities/Document.js';
import Operation from '../../../src/core/entities/Operation.js';
import Result from '../../../src/core/entities/Result.js';
import DocumentRepository from '../../../src/adapters/repositories/DocumentRepository.js';
import ODM from '../../../main.js';
import deepEqual from '../../../src/shared/__utils__/deepEqual.js';
import uid from '../../../src/shared/__utils__/uid.js';
import { READ_SUCCESSFUL } from '../../../src/infrastructure/IO-API/response-tokens.js';
import config from '../../../src/config.js';

ODM.setConfig({ ENV: 'test' });

export {
    Document,
    Operation,
    Result,
    DocumentRepository,
    deepEqual,
    uid,
    READ_SUCCESSFUL,
    config,
};
