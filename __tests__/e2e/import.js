import ODM from '../../main.js';
import documentController from '../../src/adapters/controllers/DocumentController.js';
import Document from '../../src/core/entities/Document.js';
import Schema from '../../src/core/entities/Schema.js';
import Operation from '../../src/core/entities/Operation.js';
import Result from '../../src/core/entities/Result.js';
import config from '../../src/config.js';
import isObject from '../../src/shared/__utils__/isObject.js';
import deepEqual from '../../src/shared/__utils__/deepEqual.js';
import uid from '../../src/shared/__utils__/uid.js';
import { INPUT_IS_INVALID } from '../../src/adapters/controllers/response-tokens.js';
import {
    DB_ALREADY_EXISTS,
    INSTANTIATION_SUCCESSFUL,
    SAVE_SUCCESSFUL,
    READ_SUCCESSFUL,
    UPDATE_SUCCESSFUL,
    DELETE_SUCCESSFUL,
    NO_ID,
} from '../../src/infrastructure/IO-API/response-tokens.js';

ODM.setConfig({ ENV: 'test', LOGGER: null });

export {
    documentController,
    Document,
    Schema,
    Operation,
    Result,
    config,
    deepEqual,
    isObject,
    uid,
    DB_ALREADY_EXISTS,
    INSTANTIATION_SUCCESSFUL,
    SAVE_SUCCESSFUL,
    READ_SUCCESSFUL,
    UPDATE_SUCCESSFUL,
    DELETE_SUCCESSFUL,
    NO_ID,
    INPUT_IS_INVALID,
};
