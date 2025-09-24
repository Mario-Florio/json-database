import { setupUseCase, isDocument } from './__utils__/automate.js';
import { FIND_ONE } from './imports.js';

describe('FIND ONE DOCUMENT', () => {
    it(
        'Returns an instance of Document',
        async () => {
            const useCase = await setupUseCase(FIND_ONE);
            const { data } = await useCase.execute({
                keys: { prop: 'item 1' },
            });
            expect(isDocument(data)).toBe(true);
        },
        false,
        true,
    );
    it('Returned Document has all specified key:val pairs', async () => {
        const useCase = await setupUseCase(FIND_ONE);
        const { data } = await useCase.execute({ keys: { prop: 'item 1' } });
        expect(data.prop).toBe('item 1');
    });
    it('Returns null if no Document is found to have all specified key:val pairs', async () => {
        const useCase = await setupUseCase(FIND_ONE);
        const { data } = await useCase.execute({
            keys: { non_existent_prop: true },
        });
        expect(data).toBe(null);
    });
});
