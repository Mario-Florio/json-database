import ODM from '../../../main.js';
import config from '../../../src/config.js';

const { setConfig, SimpleLogger } = ODM;

describe('SET CONFIG', () => {
    describe('DBPATH', () => {
        it('Sets config.DBPATH if DBPATH is valid', () => {
            const DBPATH = 'database/collections';
            setConfig({ DBPATH });
            expect(config.DBPATH).toBe(DBPATH);
        });

        it('Throws Error if DBPATH is invalid', () => {
            const errs = [];

            const MAX_DIR_LENGTH = 100;
            let exceedsMaxLenStr = '';
            for (let i = 0; i < MAX_DIR_LENGTH + 1; i++) {
                exceedsMaxLenStr += 'c';
            }

            const invalidDBPATHs = [
                1, // number
                {}, // object
                [], // array
                '', // empty
                '//', // empty with path seperation
                exceedsMaxLenStr, // dir exceeds max length
            ];

            for (const DBPATH of invalidDBPATHs) {
                try {
                    setConfig({ DBPATH });
                } catch (err) {
                    errs.push(err.message);
                }
            }

            expect(errs.length).toBe(invalidDBPATHs.length);
        });
    });

    describe('ENV', () => {
        it('Sets config.ENV if ENV is valid', () => {
            const validENVs = ['development', 'production', 'test'];
            for (const ENV of validENVs) {
                setConfig({ ENV });
                expect(config.ENV).toBe(ENV);
            }
        });

        it('Throws Error if ENV is invalid', () => {
            const errs = [];

            const invalidENVs = [
                1, // number
                {}, // object
                [], // array
                '', // empty
                'INVALID', // invalid entry (I.e. not 'development', 'production', or 'test')
            ];

            for (const ENV of invalidENVs) {
                try {
                    setConfig({ ENV });
                } catch (err) {
                    errs.push(err.message);
                }
            }

            expect(errs.length).toBe(invalidENVs.length);
        });
    });

    describe('LOGGER', () => {
        it('Sets config.LOGGER if LOGGER is valid', () => {
            const LOGGER = new SimpleLogger(console);
            setConfig({ LOGGER });
            expect(config.LOGGER).toBe(LOGGER);
        });

        it('Throws Error if LOGGER is invalid', () => {
            const errs = [];

            const invalidLOGGERs = [
                1, // number
                [], // array
                '', // string
                {}, // doesn't contain expected methods (I.e. info, warn, error)
            ];

            for (const LOGGER of invalidLOGGERs) {
                try {
                    setConfig({ LOGGER });
                } catch (err) {
                    errs.push(err.message);
                }
            }

            expect(errs.length).toBe(invalidLOGGERs.length);
        });
    });

    describe('LOGPATH', () => {
        it('Sets config.LOGPATH if LOGPATH is valid', () => {
            const LOGPATH = '.logs';
            setConfig({ LOGPATH });
            expect(config.LOGPATH).toBe(LOGPATH);
        });

        it('Throws Error if LOGPATH is invalid', () => {
            const errs = [];

            const MAX_DIR_LENGTH = 100;
            let exceedsMaxLenStr = '';
            for (let i = 0; i < MAX_DIR_LENGTH + 1; i++) {
                exceedsMaxLenStr += 'c';
            }

            const invalidLOGPATHs = [
                1, // number
                {}, // object
                [], // array
                '', // empty
                '//', // empty with path seperation
                exceedsMaxLenStr, // dir exceeds max length
            ];

            for (const LOGPATH of invalidLOGPATHs) {
                try {
                    setConfig({ LOGPATH });
                } catch (err) {
                    errs.push(err.message);
                }
            }

            expect(errs.length).toBe(invalidLOGPATHs.length);
        });
    });
});
