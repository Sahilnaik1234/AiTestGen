import { InventoryManager } from './InventoryManager';

describe('InventoryManager', () => {
    let inventoryManager: InventoryManager;

    beforeEach(() => {
        inventoryManager = new InventoryManager();
    });

    describe('addStock', () => {
        it('should add stock to the inventory', () => {
            inventoryManager.addStock('item1', 10);
            expect(inventoryManager.getStock('item1')).toBe(10);
        });

        it('should throw an error if quantity is not positive', () => {
            expect(() => inventoryManager.addStock('item1', 0)).toThrowError('Quantity must be positive');
            expect(() => inventoryManager.addStock('item1', -10)).toThrowError('Quantity must be positive');
        });

        it('should add stock to an existing item', () => {
            inventoryManager.addStock('item1', 10);
            inventoryManager.addStock('item1', 20);
            expect(inventoryManager.getStock('item1')).toBe(30);
        });
    });


    describe('removeItem', () => {
        it('should remove an item from the inventory', () => {
            inventoryManager.addStock('item1', 10);
            expect(inventoryManager.removeItem('item1')).toBe(true);
            expect(inventoryManager.getStock('item1')).toBe(0);
        });

        it('should return false if the item does not exist', () => {
            expect(inventoryManager.removeItem('item1')).toBe(false);
        });
    });
});