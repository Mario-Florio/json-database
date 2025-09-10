import { isGenerator, must } from './imports.js';

class DocReader {
    #gen;
    #transform;
    constructor(generator, transformFn = (doc) => doc) {
        must(
            isGenerator(generator),
            'Invalid Type — generator must be generator object',
        );
        must(
            typeof transformFn === 'function',
            'Invalid Type — transformFn must be a function',
        );

        this.#gen = generator;
        this.#transform = transformFn;
    }
    *read() {
        for (const doc of this.#gen) {
            yield this.#transform(doc);
        }
    }
}

export default DocReader;
