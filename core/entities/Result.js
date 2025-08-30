
class Result {
    constructor(paramObj) {
        this.message = paramObj.message;
        this.success = paramObj.success;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    removeData() {
        delete this.data;
        return this;
    }
    setGen(gen) {
        this.gen = gen;
        return this;
    }
    removeGen() {
        delete this.gen;
        return this;
    }
}

export default Result;