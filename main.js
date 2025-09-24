import Schema from './src/core/entities/Schema.js';
import model from './src/infrastructure/Model/Model.js';
import config from './src/config.js';

function setConfig({ DBPATH }) {
    if (typeof DBPATH !== 'string') throw new Error('DBPATH must be a string');
    config.DBPATH = DBPATH;
}

export default {
    Schema,
    model,
    setConfig,
};
