
class StubController {
    #instantiateCollection = () => {};
    #createDocument = () => {};
    #findDocuments = () => {};
    #findOneDocument = () => {};
    #updateDocument = () => {};
    #deleteDocument = () => {};
    setInstantiateCollection = (fn) => this.#setPrivateFn(this.#instantiateCollection, fn)
    setCreateDocument = (fn) => this.#setPrivateFn(this.#createDocument, fn)
    setFindDocuments = (fn) => this.#setPrivateFn(this.#findDocuments, fn)
    setFindOneDocument = (fn) => this.#setPrivateFn(this.#findOneDocument, fn)
    setUpdateDocument = (fn) => this.#setPrivateFn(this.#updateDocument, fn)
    setDeleteDocument = (fn) => this.#setPrivateFn(this.#deleteDocument, fn)
    #setPrivateFn = (privFn, fn) => {
        if (typeof fn !== 'function') throw new Error('Stubbed method must be a function');
        privFn = fn;
    }
};

function getStubController() {
    const stubController = new StubController();
    return stubController;
}

export default getStubController;