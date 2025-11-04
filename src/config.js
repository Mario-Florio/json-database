import SimpleLogger from './infrastructure/logging/SimpleLogger.js';

const config = {
    DBPATH: './database/collections/',
    ENABLE_CONTRACTS: false,
    LOGGER: new SimpleLogger(console),
    LOGPATH: './.logs/',
    ENV: 'production', // 'production', 'test'
};

export default config;
