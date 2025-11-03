import path from 'node:path';
import config from './config.js';

const MAX_DIR_LEN_DBPATH = 100;
const MAX_DIR_LEN_LOGPATH = 100;
const MIN_DIR_LEN_DBPATH = 1;
const MIN_DIR_LEN_LOGPATH = 1;

export default function setConfig({ DBPATH, ENV, LOGGER, LOGPATH } = {}) {
    const errMsgs = [];

    if (DBPATH !== undefined) {
        const validationObj = pathValidator(
            DBPATH,
            MAX_DIR_LEN_DBPATH,
            MIN_DIR_LEN_DBPATH,
        );
        const DBPATH_ERR_MSG_PREFIX = '* DBPATH is invalid:';
        if (validationObj.isValid === false)
            errMsgs.push(
                errMsgBuilder(DBPATH_ERR_MSG_PREFIX, validationObj.errMsgs),
            );
    }
    if (ENV !== undefined) {
        const validationObj = envValidator(ENV);
        const ENV_ERR_MSG_PREFIX = '* ENV is invalid:';
        if (validationObj.isValid === false)
            errMsgs.push(
                errMsgBuilder(ENV_ERR_MSG_PREFIX, validationObj.errMsgs),
            );
    }
    if (LOGGER !== undefined) {
        const validationObj = loggerValidator(LOGGER);
        const LOGGER_ERR_MSG_PREFIX = '* LOGGER is invalid:';
        if (validationObj.isValid === false)
            errMsgs.push(
                errMsgBuilder(LOGGER_ERR_MSG_PREFIX, validationObj.errMsgs),
            );
    }
    if (LOGPATH !== undefined) {
        const validationObj = pathValidator(
            LOGPATH,
            MAX_DIR_LEN_LOGPATH,
            MIN_DIR_LEN_LOGPATH,
        );
        const LOGPATH_ERR_MSG_PREFIX = '* LOGPATH is invalid:';
        if (validationObj.isValid === false)
            errMsgs.push(
                errMsgBuilder(LOGPATH_ERR_MSG_PREFIX, validationObj.errMsgs),
            );
    }

    if (errMsgs.length > 0) throw new Error('\n' + errMsgs.join('\n'));

    if (DBPATH !== undefined) config.DBPATH = DBPATH;
    if (ENV !== undefined) config.ENV = ENV;
    if (LOGGER !== undefined) config.LOGGER = LOGGER;
    if (LOGPATH !== undefined) config.LOGPATH = LOGPATH;
}

// UTILS
function errMsgBuilder(prefix, errMsgs) {
    let concatinatedErrMsgs = '';
    for (let i = 0; i < errMsgs.length; i++) {
        concatinatedErrMsgs += '\t' + errMsgs[i] + '\n';
    }
    return prefix + '\n' + concatinatedErrMsgs;
}

function pathValidator(PATH, MAX_DIR_LEN = 100, MIN_DIR_LEN = 1) {
    const validationObj = {
        isValid: true,
        errMsgs: [],
    };

    if (typeof PATH !== 'string') {
        validationObj.errMsgs.push('path must be a string');

        // Early return to avoid expected handling of string
        if (validationObj.errMsgs.length > 0) validationObj.isValid = false;
        return validationObj;
    }

    // Check length of each directory in path
    const dirs = PATH.split(path.sep);
    for (let i = 0; i < dirs.length; i++) {
        if (isFirstAndOnly(i, dirs) && dirs[i] === '') {
            validationObj.errMsgs.push(
                `path directory must exceed ${MIN_DIR_LEN} characters`,
            );
            continue;
        }
        if (isLast(i, dirs) && dirs[i] === '') {
            continue;
        }
        if (dirs[i].length > MAX_DIR_LEN)
            validationObj.errMsgs.push(
                `path directory can't exceed ${MAX_DIR_LEN} characters`,
            );
        if (dirs[i].length < MIN_DIR_LEN)
            validationObj.errMsgs.push(
                `path directory must exceed ${MIN_DIR_LEN} characters`,
            );
    }

    if (validationObj.errMsgs.length > 0) validationObj.isValid = false;

    return validationObj;
}

function envValidator(ENV) {
    const validationObj = {
        isValid: true,
        errMsgs: [],
    };

    const validENVs = ['development', 'production', 'test'];
    if (typeof ENV !== 'string')
        validationObj.errMsgs.push('ENV must be a string');
    if (!validENVs.includes(ENV))
        validationObj.errMsgs.push(
            'ENV must use valid environment name (development, production, test)',
        );

    if (validationObj.errMsgs.length > 0) validationObj.isValid = false;

    return validationObj;
}

function loggerValidator(LOGGER) {
    const validationObj = {
        isValid: true,
        errMsgs: [],
    };

    if (typeof LOGGER !== 'object')
        validationObj.errMsgs.push('LOGGER must be an object');
    if (LOGGER.info === undefined)
        validationObj.errMsgs.push('LOGGER.info must be defined');
    if (typeof LOGGER.info !== 'function')
        validationObj.errMsgs.push('LOGGER.info must a function');
    if (LOGGER.warn === undefined)
        validationObj.errMsgs.push('LOGGER.warn must be defined');
    if (typeof LOGGER.warn !== 'function')
        validationObj.errMsgs.push('LOGGER.warn must a function');
    if (LOGGER.error === undefined)
        validationObj.errMsgs.push('LOGGER.error must be defined');
    if (typeof LOGGER.error !== 'function')
        validationObj.errMsgs.push('LOGGER.error must a function');

    if (validationObj.errMsgs.length > 0) validationObj.isValid = false;

    return validationObj;
}

function isFirstAndOnly(i, arr) {
    return i === 0 && arr.length < 2;
}

function isLast(i, arr) {
    return i === arr.length - 1;
}
