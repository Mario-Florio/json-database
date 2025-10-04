import EventEmitter from 'node:events';

class LogEventEmitterDouble extends EventEmitter {}

const logEventEmitterDouble = new LogEventEmitterDouble();
logEventEmitterDouble.removeAllListeners();

export default logEventEmitterDouble;
