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

    describe('getStock', () => {
        it('should return the stock of an item', () => {
            inventoryManager.addStock('item1', 10);
            expect(inventoryManager.getStock('item1')).toBe(10);
        });

        it('should return 0 if the item does not exist', () => {
            expect(inventoryManager.getStock('item1')).toBe(0);
        });
    });

    describe('reserveStock', () => {
        it('should reserve stock of an item', () => {
            inventoryManager.addStock('item1', 10);
            expect(inventoryManager.reserveStock('item1', 5)).toBe(true);
            expect(inventoryManager.getAvailable('item1')).toBe(5);
        });

        it('should not reserve stock if quantity is not positive', () => {
            inventoryManager.addStock('item1', 10);
            expect(inventoryManager.reserveStock('item1', 0)).toBe(false);
            expect(inventoryManager.reserveStock('item1', -10)).toBe(false);
        });

        it('should not reserve stock if quantity exceeds available stock', () => {
            inventoryManager.addStock('item1', 10);
            expect(inventoryManager.reserveStock('item1', 15)).toBe(false);
        });
    });

    describe('releaseReservation', () => {
        it('should release a reservation of an item', () => {
            inventoryManager.addStock('item1', 10);
            inventoryManager.reserveStock('item1', 5);
            expect(inventoryManager.releaseReservation('item1', 5)).toBe(true);
            expect(inventoryManager.getAvailable('item1')).toBe(10);
        });

        it('should not release a reservation if quantity is not positive', () => {
            inventoryManager.addStock('item1', 10);
            inventoryManager.reserveStock('item1', 5);
            expect(inventoryManager.releaseReservation('item1', 0)).toBe(false);
            expect(inventoryManager.releaseReservation('item1', -10)).toBe(false);
        });

        it('should not release a reservation if quantity exceeds reserved stock', () => {
            inventoryManager.addStock('item1', 10);
            inventoryManager.reserveStock('item1', 5);
            expect(inventoryManager.releaseReservation('item1', 10)).toBe(false);
        });
    });

    describe('fulfillReservation', () => {
        it('should fulfill a reservation of an item', () => {
            inventoryManager.addStock('item1', 10);
            inventoryManager.reserveStock('item1', 5);
            expect(inventoryManager.fulfillReservation('item1', 5)).toBe(true);
            expect(inventoryManager.getStock('item1')).toBe(5);
            expect(inventoryManager.getAvailable('item1')).toBe(5);
        });

        it('should not fulfill a reservation if quantity is not positive', () => {
            inventoryManager.addStock('item1', 10);
            inventoryManager.reserveStock('item1', 5);
            expect(inventoryManager.fulfillReservation('item1', 0)).toBe(false);
            expect(inventoryManager.fulfillReservation('item1', -10)).toBe(false);
        });

        it('should not fulfill a reservation if quantity exceeds reserved stock', () => {
            inventoryManager.addStock('item1', 10);
            inventoryManager.reserveStock('item1', 5);
            expect(inventoryManager.fulfillReservation('item1', 10)).toBe(false);
        });
    });

    describe('getAvailable', () => {
        it('should return the available stock of an item', () => {
            inventoryManager.addStock('item1', 10);
            expect(inventoryManager.getAvailable('item1')).toBe(10);
        });

        it('should return the available stock of an item after reservation', () => {
            inventoryManager.addStock('item1', 10);
            inventoryManager.reserveStock('item1', 5);
            expect(inventoryManager.getAvailable('item1')).toBe(5);
        });
    });

    describe('isLowStock', () => {
        it('should return true if the available stock is below the threshold', () => {
            inventoryManager.addStock('item1', 10);
            inventoryManager.reserveStock('item1', 8);
            expect(inventoryManager.isLowStock('item1')).toBe(true);
        });

        it('should return false if the available stock is above the threshold', () => {
            inventoryManager.addStock('item1', 10);
            expect(inventoryManager.isLowStock('item1')).toBe(false);
        });

        it('should return true if the available stock is equal to the threshold', () => {
            inventoryManager.addStock('item1', 5);
            expect(inventoryManager.isLowStock('item1')).toBe(true);
        });

        it('should return true if the item does not exist', () => {
            expect(inventoryManager.isLowStock('item1')).toBe(true);
        });

        it('should allow a custom threshold', () => {
            inventoryManager.addStock('item1', 10);
            expect(inventoryManager.isLowStock('item1', 15)).toBe(true);
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