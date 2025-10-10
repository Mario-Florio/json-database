import { setupUseCase, getSchema } from './__utils__/automate.js';
import { Operation, SAVE, isObject } from './imports.js';

describe('SAVE DOCUMENTS', () => {
    it('Returns a non-array object with message and truthy success fields', async () => {
        const useCase = await setupUseCase(SAVE);
        const schema = getSchema();
        const data = { _id: 'id', prop: 'item 11' };

        const operationObj = new Operation({
            type: Operation.types.CREATE_DOCUMENT,
            collectionId: '',
            payload: { schema, data },
        });

        const response = await useCase.execute(operationObj);

        expect(isObject(response)).toBe(true);
        expect(response.message).toBeTruthy();
        expect(response.success).toBe(true);
    });
    it('Returns a non-array object with message and falsy success fields if data does not represent schema', async () => {
        const useCase = await setupUseCase(SAVE);
        const schema = getSchema();
        const data = {
            _id: 'id',
            // doesn't contain collections 'prop'
        };

        const operationObj = new Operation({
            type: Operation.types.CREATE_DOCUMENT,
            collectionId: '',
            payload: { schema, data },
        });

        const response = await useCase.execute(operationObj);

        expect(isObject(response)).toBe(true);
        expect(response.message).toBeTruthy();
        expect(response.success).toBe(false);
    });
});
