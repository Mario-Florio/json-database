
class STUB_IO_SERVICE {
    #file

    constructor() {
        this.#file = '';
    }
    readFileSync = (paramObj) => {
        if (!paramObj.path) throw new Error('Must give path to file');
        return this.#file;
    }
    writeFileSync = (paramObj) => {
        if (!paramObj.path) throw new Error('Must give path to file');
        if (!paramObj.data) throw new Error('Must give data');
        this.#file.concat(paramObj.data);
    }
    existsSync = (paramObj) => {
        if (!paramObj.path) throw new Error('Must give path to file');
        return !(this.#file !== null);
    }
}

module.exports = STUB_IO_SERVICE;