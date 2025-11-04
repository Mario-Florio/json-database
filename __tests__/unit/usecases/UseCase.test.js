import {
    DocumentRepoUseCase,
    IDocumentRepository,
    implementsInterface,
} from './imports.js';

describe('DOC REPO USE CASE', () => {
    describe('constructor', () => {
        it('Returns valid use case instance if repo implements IDocumentRepository and ILogTaskDispatcher', () => {
            class ValidDocumentRepository {
                instantiate() {}
                create() {}
                read() {}
                update() {}
                delete() {}
            }

            class ValidLogTaskDispatcher {
                static #logTasks = {};
                static get logTasks() {
                    return ValidLogTaskDispatcher.#logTasks;
                }
                get logTasks() {
                    return ValidLogTaskDispatcher.#logTasks;
                }
                dispatch(logTask, operation, ...args) {}
            }

            const validRepo = new ValidDocumentRepository();
            const validLogTaskDispatcher = new ValidLogTaskDispatcher();
            const validDocRepoUseCase = new DocumentRepoUseCase(
                validRepo,
                validLogTaskDispatcher,
            );
            expect(validDocRepoUseCase).toBeTruthy();
        });
    });

    describe('implementsInterface', () => {
        it('Returns true if class instance implements Interface methods', () => {
            class Class {
                instantiate() {}
                create() {}
                read() {}
                update() {}
                delete() {}
            }

            expect(implementsInterface(new Class(), IDocumentRepository)).toBe(
                true,
            );
        });
        it('Returns true if object instance implements Interface methods', () => {
            const prototype = {
                instantiate: function () {},
                create: function () {},
                read: function () {},
                update: function () {},
                delete: function () {},
            };

            expect(
                implementsInterface(
                    Object.create(prototype),
                    IDocumentRepository,
                ),
            ).toBe(true);
        });
        it('Returns false if object instance does not implement all Interface methods', () => {
            const methods = [
                'instantiate',
                'create',
                'read',
                'update',
                'delete',
            ];

            const results = [];
            for (let i = 0; i < methods.length; i++) {
                let prototype = {};
                for (let j = 0; j < methods.length; j++) {
                    if (j === i) continue;
                    prototype[methods[j]] = function () {};
                }
                results.push(
                    implementsInterface(
                        Object.create(prototype),
                        IDocumentRepository,
                    ),
                );
            }

            for (const result of results) expect(result === false).toBe(true);
        });
    });
});
