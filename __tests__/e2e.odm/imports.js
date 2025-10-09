import ODM from '../../main.js';
import config from '../../src/config.js';
import { uid } from '../e2e/import.js';
import {
    DELETE_SUCCESSFUL,
    ITEM_NOT_FOUND,
} from '../../src/infrastructure/IO-API/response-tokens.js';

ODM.setConfig({ ENV: 'test', LOGGER: null });

export { ODM, config, uid, DELETE_SUCCESSFUL, ITEM_NOT_FOUND };
