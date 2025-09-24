import { setupUseCase, isDocument } from './__utils__/automate.js';
import { FIND } from './imports.js';

describe('FIND DOCUMENTS', () => {
    it('Returns an array of Documents', async () => {
        const useCase = await setupUseCase(FIND);
        const { data } = await useCase.execute({ keys: {} });
        expect(data.every((document) => isDocument(document))).toBe(true);
    });
    it('Returns an array of filtered Documents if keys are defined — all Documents have specified key:val pairs', async () => {
        const useCase = await setupUseCase(FIND);
        const { data } = await useCase.execute({ keys: { prop: 'item 3' } });
        expect(data.every((document) => document.prop === 'item 3')).toBe(true);
    });
    it('Returns empty array if no Documents has specifiec key-val pairs', async () => {
        const useCase = await setupUseCase(FIND);
        const { data } = await useCase.execute({
            keys: { non_existent_prop: true },
        });
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBe(0);
    });
});
