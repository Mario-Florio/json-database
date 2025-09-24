import { uphold, isGenerator } from './imports.js';

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
        uphold(
            isGenerator(gen),
            'Invalid Type — gen must be a generator object',
        );
        this.gen = gen;
        return this;
    }
    removeGen() {
        delete this.gen;
        return this;
    }
}

export default Result;
