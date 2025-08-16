const DocumentRepoUseCase = require('../UseCase.js');
const IDocumentRepository = require('../../ports/IDocumentRepository.js');
const implementsInterface = require('../__utils__/implementsInterface.js');
const { it, assert } = require('../../../shared/testing/test-tools.js');

module.exports = {
    DocumentRepoUseCase,
    IDocumentRepository,
    implementsInterface,
    it, assert
}