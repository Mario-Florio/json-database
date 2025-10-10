import { setupUseCase, getSchema, getTargetDoc } from './__utils__/automate.js';
import { Operation, UPDATE, isObject } from './imports.js';

describe('UPDATE DOCUMENTS', () => {
    it('Returns a non-array object with message and success fields', async () => {
        const useCase = await setupUseCase(UPDATE);
        const schema = getSchema();
        const data = await getTargetDoc(useCase.repo);
        const updatedKeys = { prop: 'updated value' };

        const operationObj = new Operation({
            type: Operation.types.UPDATE_DOCUMENT,
            collectionId: '',
            payload: {
                schema,
                _id: data._id,
                data,
                updatedKeys,
            },
        });

        const response = await useCase.execute(operationObj);

        expect(isObject(response)).toBe(true);
        expect(response.message).toBeTruthy();
        expect(response.success).toBe(true);
    });
    it('Returns a non-array object with message and falsy success fields if Document does not represent schema', async () => {
        const useCase = await setupUseCase(UPDATE);
        const schema = getSchema();
        const data = await getTargetDoc(useCase.repo);
        delete data.prop;
        const updatedKeys = { non_existent_prop: true };

        const operationObj = new Operation({
            type: Operation.types.UPDATE_DOCUMENT,
            collectionId: '',
            payload: {
                schema,
                _id: data._id,
                data,
                updatedKeys,
            },
        });

        const response = await useCase.execute(operationObj);

        expect(isObject(response)).toBe(true);
        expect(response.message).toBeTruthy();
        expect(response.success).toBe(false);
    });
});
