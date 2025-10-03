import Schema from './src/core/entities/Schema.js';
import model from './src/infrastructure/Model/Model.js';
import config from './src/config.js';

function setConfig({ DBPATH, ENV, LOGGER, LOGGER_PRETTY_PRINT } = {}) {
    if (DBPATH && typeof DBPATH !== 'string')
        throw new Error('DBPATH must be a string');
    if (ENV && typeof ENV !== 'string') throw new Error('ENV must be a string');
    if (LOGGER && typeof LOGGER !== 'object')
        throw new Error('LOGGER must be an object');
    if (LOGGER_PRETTY_PRINT && typeof LOGGER_PRETTY_PRINT !== 'boolean')
        throw new Error('LOGGER_PRETTY_PRINT must be a boolean');

    if (DBPATH !== undefined) config.DBPATH = DBPATH;
    if (ENV !== undefined) config.ENV = ENV;
    if (LOGGER !== undefined) config.LOGGER = LOGGER;
    if (LOGGER_PRETTY_PRINT !== undefined)
        config.LOGGER_PRETTY_PRINT = LOGGER_PRETTY_PRINT;
}

export default {
    Schema,
    model,
    setConfig,
};
