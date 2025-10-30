import Schema from './src/core/entities/Schema.js';
import model from './src/infrastructure/Model/Model.js';
import SimpleLogger from './src/infrastructure/logging/SimpleLogger.js';
import FileStream from './src/infrastructure/logging/FileStream.js';
import setConfig from './src/setConfig.js';

export default {
    Schema,
    model,
    SimpleLogger,
    FileStream,
    setConfig,
};
