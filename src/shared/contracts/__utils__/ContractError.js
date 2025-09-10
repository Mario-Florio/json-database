class ContractError extends Error {
    constructor(message, options) {
        super(message, options);
    }
}

export default ContractError;
