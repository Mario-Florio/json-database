
class Result {
    constructor(paramObj) {
        this.message = paramObj.message;
        this.success = paramObj.success;
    }
    setData(data) {
        this.data = data;
        return this;
    }
}

export default Result;