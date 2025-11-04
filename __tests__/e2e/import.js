import Document from '../../src/core/entities/Document.js';
import Operation from '../../src/core/entities/Operation.js';
import Result from '../../src/core/entities/Result.js';
import Schema from '../../src/core/entities/Schema.js';
import documentController from '../../src/adapters/controllers/DocumentController.js';
import ODM from '../../main.js';
import deepEqual from '../../src/shared/__utils__/deepEqual.js';
import isObject from '../../src/shared/__utils__/isObject.js';
import uid from '../../src/shared/__utils__/uid.js';
import { INPUT_IS_INVALID } from '../../src/adapters/controllers/response-tokens.js';
import {
    DB_ALREADY_EXISTS,
    DELETE_SUCCESSFUL,
    INSTANTIATION_SUCCESSFUL,
    NO_ID,
    SAVE_SUCCESSFUL,
    READ_SUCCESSFUL,
    UPDATE_SUCCESSFUL,
} from '../../src/infrastructure/IO-API/response-tokens.js';
import config from '../../src/config.js';

ODM.setConfig({ ENV: 'test' });

export {
    Document,
    Schema,
    Operation,
    Result,
    documentController,
    deepEqual,
    isObject,
    uid,
    INPUT_IS_INVALID,
    DB_ALREADY_EXISTS,
    INSTANTIATION_SUCCESSFUL,
    DELETE_SUCCESSFUL,
    NO_ID,
    SAVE_SUCCESSFUL,
    READ_SUCCESSFUL,
    UPDATE_SUCCESSFUL,
    config,
};
