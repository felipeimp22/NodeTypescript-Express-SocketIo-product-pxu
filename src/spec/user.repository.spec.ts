import Repository from '../repository/repository';
import { Model } from 'mongoose';
import { UserInterfaceDocument } from "../dto/user.dto";
import { createMockModel } from './__mocks__/mockModelFactory';

describe('User Repository', () => {
    let repo: Repository<UserInterfaceDocument>;
    let mockModel: any;

    beforeEach(() => {
        mockModel = createMockModel();
        repo = new Repository<UserInterfaceDocument>(mockModel as Model<UserInterfaceDocument>);
    });

    describe('getAllWithFilters', () => {
        it('should retrieve all users successfully', async () => {
            const expectedUsers = [
                { _id: '1', email: 'test1@example.com', bought_items: [] },
                { _id: '2', email: 'test2@example.com', bought_items: [] }
            ];

            mockModel.find.mockReturnThis();
            mockModel.sort.mockReturnThis();
            mockModel.skip.mockReturnThis();
            mockModel.limit.mockReturnThis();
            mockModel.lean.mockResolvedValueOnce(expectedUsers);

            const result = await repo.getAllWithFilters({}, '', 0, 10);
            expect(result).toEqual(expectedUsers);
        });

        it('should throw an error when retrieval fails', async () => {
            mockModel.find.mockReturnThis();
            mockModel.sort.mockReturnThis();
            mockModel.skip.mockReturnThis();
            mockModel.limit.mockReturnThis();
            mockModel.lean.mockRejectedValueOnce(new Error('Retrieval failed'));

            await expect(repo.getAllWithFilters({}, '', 0, 10))
                .rejects
                .toThrow('Retrieval failed');
        });
    });

    describe('getById', () => {
        it('should retrieve a user by ID successfully', async () => {
            const expectedUser = { _id: '1', email: 'test@example.com', bought_items: [] };

            mockModel.findById.mockReturnThis();
            mockModel.lean.mockResolvedValueOnce(expectedUser);

            const result = await repo.getById('1');
            expect(result).toEqual(expectedUser);
        });

        it('should return null when user is not found', async () => {
            mockModel.findById.mockReturnThis();
            mockModel.lean.mockResolvedValueOnce(null);

            const result = await repo.getById('non-existent-id');
            expect(result).toBeNull();
        });
    });

    describe('deleteById', () => {
        it('should delete a user by ID successfully', async () => {
            mockModel.findByIdAndDelete.mockReturnThis();
            mockModel.lean.mockResolvedValueOnce(true);

            const result = await repo.deleteById('1');
            expect(result).toEqual(true);
        });

        it('should throw an error when deletion fails', async () => {
            mockModel.findByIdAndDelete.mockReturnThis();
            mockModel.lean.mockRejectedValueOnce(new Error('Deletion failed'));

            await expect(repo.deleteById('1'))
                .rejects
                .toThrow('Failed to delete: Deletion failed');
        });
    });
});
