import Schema from './src/core/entities/Schema.js';
import model from './src/infrastructure/Model/Model.js';
import SimpleLogger from './src/infrastructure/logging/SimpleLogger.js';
import config from './src/config.js';

function setConfig({ DBPATH, ENV, LOGGER } = {}) {
    if (DBPATH && typeof DBPATH !== 'string')
        throw new Error('DBPATH must be a string');
    if (ENV && typeof ENV !== 'string') throw new Error('ENV must be a string');
    if (LOGGER && typeof LOGGER !== 'object')
        throw new Error('LOGGER must be an object');

    if (DBPATH !== undefined) config.DBPATH = DBPATH;
    if (ENV !== undefined) config.ENV = ENV;
    if (LOGGER !== undefined) config.LOGGER = LOGGER;
}

export default {
    Schema,
    model,
    SimpleLogger,
    setConfig,
};
