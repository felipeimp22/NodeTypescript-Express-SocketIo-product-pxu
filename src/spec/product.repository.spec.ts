import Repository from '../repository/repository';
import { Model } from 'mongoose';
import { productInterfaceDocument } from "../dto/product.dto";
import { createMockModel } from './__mocks__/mockModelFactory';

describe('Product Repository', () => {
    let repo: Repository<productInterfaceDocument>;
    let mockModel: any;

    beforeEach(() => {
        mockModel = createMockModel();
        repo = new Repository<productInterfaceDocument>(mockModel as Model<productInterfaceDocument>);
    });

    describe('getAllWithFilters', () => {
        it('should retrieve all products successfully', async () => {
            const expectedProducts = [
                { _id: '1', title: 'Product 1', inventory: 10 },
                { _id: '2', title: 'Product 2', inventory: 20 }
            ];

            mockModel.find.mockReturnThis();
            mockModel.sort.mockReturnThis();
            mockModel.skip.mockReturnThis();
            mockModel.limit.mockReturnThis();
            mockModel.lean.mockResolvedValueOnce(expectedProducts);

            const result = await repo.getAllWithFilters({}, '', 0, 10);
            expect(result).toEqual(expectedProducts);
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
        it('should retrieve a product by ID successfully', async () => {
            const expectedProduct = { _id: '1', title: 'Product 1', inventory: 10 };

            mockModel.findById.mockReturnThis();
            mockModel.lean.mockResolvedValueOnce(expectedProduct);

            const result = await repo.getById('1');
            expect(result).toEqual(expectedProduct);
        });

        it('should return null when product is not found', async () => {
            mockModel.findById.mockReturnThis();
            mockModel.lean.mockResolvedValueOnce(null);

            const result = await repo.getById('non-existent-id');
            expect(result).toBeNull();
        });
    });

    describe('deleteById', () => {
        it('should delete a product by ID successfully', async () => {
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
