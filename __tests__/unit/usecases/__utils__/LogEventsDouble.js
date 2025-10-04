import EventEmitter from 'node:events';

class LogEventEmitterDouble extends EventEmitter {
    events = {
        ATTEMPT: 'ATTEMPT',
        SUCCESS: 'SUCCESS',
        FAILED: 'FAILED',
        CORE: 'CORE',
        ERROR: 'ERROR',
    };

    emit(event, ...args) {
        return;
    }
}

const logEventEmitterDouble = new LogEventEmitterDouble();
logEventEmitterDouble.removeAllListeners();

export default logEventEmitterDouble;
