const ErrorEntity = require('../entities/ErrorEntity.js');

const severity = 1;

class CoreError extends ErrorEntity {
    constructor(message, options) {
        super(message, options, severity);
    }
}

module.exports = CoreError;