
class ErrorEntity extends Error {
    constructor(message, options, severity) {
        super(message, options);
        this.severity = severity; // Number 1-2 (1 being most severe)
    }
    isSevere() {
        return this.severity < 2;
    }
}

module.exports = ErrorEntity;