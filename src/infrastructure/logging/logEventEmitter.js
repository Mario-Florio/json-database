import EventEmitter from 'node:events';
import LoggingService from '../../adapters/services/LoggingService.js';
import config from '../../config.js';

const retentionPolicies = {
    // Define retention policies for different environments via filter functions
    production: [
        (event, operation) => event === 'ATTEMPT', // Don't log ATTEMPT events
        (event, operation) => event === 'CORE', // Don't log CORE events
        (event, operation) => event === 'REPO', // Don't log REPO events
        (event, operation) => event === 'DB_HITS', // Don't log DB_HITS events
    ],
    development: [],
    test: [(event, operation) => true], // Don't log anything in test environment (return true for all events/operations)
};

class LogEventEmitter extends EventEmitter {
    events = {
        ATTEMPT: 'ATTEMPT',
        SUCCESS: 'SUCCESS',
        FAILED: 'FAILED',
        CORE: 'CORE',
        REPO: 'REPO',
        DB_HITS: 'DB_HITS',
        ERROR: 'ERROR',
    };

    emit(event, operation, ...args) {
        for (const policy of retentionPolicies[config.ENV])
            if (policy(event, operation)) return false;

        return super.emit(event, operation, ...args);
    }
}

const logEventEmitter = new LogEventEmitter().setMaxListeners(20);

logEventEmitter.on(logEventEmitter.events.ATTEMPT, LoggingService.logAttempt);

logEventEmitter.on(logEventEmitter.events.SUCCESS, LoggingService.logSuccess);

logEventEmitter.on(logEventEmitter.events.FAILED, LoggingService.logFailed);

logEventEmitter.on(logEventEmitter.events.CORE, LoggingService.logCore);

logEventEmitter.on(logEventEmitter.events.REPO, LoggingService.logRepo);

logEventEmitter.on(logEventEmitter.events.DB_HITS, LoggingService.logDbHit);

logEventEmitter.on(logEventEmitter.events.ERROR, LoggingService.logError);

export default logEventEmitter;
