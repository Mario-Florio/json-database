import ODM from '../../../main.js';
import DocumentRepository from '../../../src/adapters/repositories/DocumentRepository.js';
import Document from '../../../src/core/entities/Document.js';
import Result from '../../../src/core/entities/Result.js';
import Operation from '../../../src/core/entities/Operation.js';
import config from '../../../src/config.js';
import deepEqual from '../../../src/shared/__utils__/deepEqual.js';
import uid from '../../../src/shared/__utils__/uid.js';
import { READ_SUCCESSFUL } from '../../../src/infrastructure/IO-API/response-tokens.js';

ODM.setConfig({ ENV: 'test', LOGGER: null });

export {
    DocumentRepository,
    Document,
    Result,
    Operation,
    config,
    deepEqual,
    uid,
    READ_SUCCESSFUL,
};
