import ODM from '../../main.js';
import uid from '../../src/shared/__utils__/uid.js';
import {
    DELETE_SUCCESSFUL,
    ITEM_NOT_FOUND,
} from '../../src/infrastructure/IO-API/response-tokens.js';
import config from '../../src/config.js';

ODM.setConfig({ ENV: 'test' });

export { ODM, uid, DELETE_SUCCESSFUL, ITEM_NOT_FOUND, config };
