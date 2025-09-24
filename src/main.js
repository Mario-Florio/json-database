import Schema from './core/entities/Schema.js';
import model from './infrastructure/Model/Model.js';
import config from './config.js';

function setConfig({ DBPATH }) {
    if (typeof DBPATH !== 'string') throw new Error('DBPATH must be a string');
    config.DBPATH = DBPATH;
}

export default {
    Schema,
    model,
    setConfig,
};
