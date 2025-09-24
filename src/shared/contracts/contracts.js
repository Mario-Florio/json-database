import config from '../../config.js';
import ContractError from './__utils__/ContractError.js';

const ENABLE_CONTRACTS =
    process.env.ENABLE_CONTRACTS || config.ENABLE_CONTRACTS;

function must(condition, message) {
    if (!ENABLE_CONTRACTS) return;
    if (!condition) {
        throw new ContractError(`Precondition Error: ${message}`);
    }
}

function uphold(condition, message) {
    if (!ENABLE_CONTRACTS) return;
    if (!condition) {
        throw new ContractError(`Invariant Error: ${message}`);
    }
}

function guarantee(condition, message) {
    if (!ENABLE_CONTRACTS) return;
    if (!condition) {
        throw new ContractError(`Postcondition Error: ${message}`);
    }
}

export { must, uphold, guarantee };
