
class ContractError extends Error {
    constructor(message, options) {
        super(message, options);
    }
}

module.exports = ContractError