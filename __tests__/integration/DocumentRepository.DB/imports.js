const { it, assert } = require('../../../shared/testing/test-tools.js');
const DocumentRepository = require('../../../adapters/repositories/DocumentRepository.js');
const Document = require('../../../core/entities/Document.js');
const deepEqual = require('../../../shared/__utils__/deepEqual.js');

module.exports = {
    it,
    assert,
    DocumentRepository,
    Document,
    deepEqual
}