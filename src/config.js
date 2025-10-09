import SimpleLogger from './infrastructure/logging/SimpleLogger.js';

const config = {
    DBPATH: './database/collections/',
    ENABLE_CONTRACTS: true,
    LOGGER: new SimpleLogger(console),
    ENV: 'development', // 'production', 'test'
};

export default config;
