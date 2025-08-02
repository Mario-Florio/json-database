
class StubController {
    #instantiateCollection = () => {};
    #createDocument = () => {};
    #findDocuments = () => {};
    #findOneDocument = () => {};
    #updateDocument = () => {};
    #deleteDocument = () => {};
    setInstantiateCollection = (fn) => this.#setPrivateFn(this.#instantiateCollection)
    setCreateDocument = (fn) => this.#setPrivateFn(this.#createDocument)
    setFindDocuments = (fn) => this.#setPrivateFn(this.#findDocuments)
    setFindOneDocument = (fn) => this.#setPrivateFn(this.#findOneDocument)
    setUpdateDocument = (fn) => this.#setPrivateFn(this.#updateDocument)
    setDeleteDocument = (fn) => this.#setPrivateFn(this.#deleteDocument)
    #setPrivateFn = (privFn) => {
        if (typeof fn !== 'function') throw new Error('Stubbed method must be a function');
        privFn = fn;
    }
};

function getStubController() {
    const stubController = new StubController();
    return stubController;
}

module.exports = getStubController;