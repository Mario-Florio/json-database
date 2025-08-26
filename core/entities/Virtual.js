
class Virtual {
    constructor(name) {
        this.name = name;
        this.getFn;
        this.setFn;
    }
    get(fn) {
        this.getFn = fn;
        return this;
    }
    set(fn) {
        this.setFn = fn;
        return this;
    }
}

export default Virtual;