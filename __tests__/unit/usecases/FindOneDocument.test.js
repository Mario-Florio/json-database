import { setupUseCase, isDocument } from './__utils__/automate.js';
import { Operation, FIND_ONE } from './imports.js';

describe('FIND ONE DOCUMENT', () => {
    it('Returns an instance of Document', async () => {
        const useCase = await setupUseCase(FIND_ONE);
        const operationObj = new Operation({
            type: Operation.types.GET_ONE_DOCUMENT,
            collectionId: '',
            payload: {
                keys: { prop: 'item 1' },
            },
        });
        const { data } = await useCase.execute(operationObj);
        expect(isDocument(data)).toBe(true);
    });
    it('Returned Document has all specified key:val pairs', async () => {
        const useCase = await setupUseCase(FIND_ONE);
        const operationObj = new Operation({
            type: Operation.types.GET_ONE_DOCUMENT,
            collectionId: '',
            payload: { keys: { prop: 'item 1' } },
        });
        const { data } = await useCase.execute(operationObj);
        expect(data.prop).toBe('item 1');
    });
    it('Returns null if no Document is found to have all specified key:val pairs', async () => {
        const useCase = await setupUseCase(FIND_ONE);
        const operationObj = new Operation({
            type: Operation.types.GET_ONE_DOCUMENT,
            collectionId: '',
            payload: {
                keys: { non_existent_prop: true },
            },
        });
        const { data } = await useCase.execute(operationObj);
        expect(data).toBe(null);
    });
});
