const { it, assert } = require('../shared/testing/test-tools.js');
const ODM = require('../ODM/ODM.js');
const config = require('../config.js');
const {
    DELETE_SUCCESSFUL,
    ITEM_NOT_FOUND
} = require('../IO-API/response-tokens.js');

module.exports = {
    it, assert,
    ODM,
    config,
    DELETE_SUCCESSFUL,
    ITEM_NOT_FOUND
}