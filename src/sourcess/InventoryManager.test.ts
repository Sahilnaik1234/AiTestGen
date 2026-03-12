import { InventoryManager } from './InventoryManager';

describe('InventoryManager', () => {
    let manager: InventoryManager;

    beforeEach(() => {
        manager = new InventoryManager();
    });

    // ~20% coverage: only tests addStock and getStock
    test('should add stock for a new item', () => {
        manager.addStock('item-A', 100);
        expect(manager.getStock('item-A')).toBe(100);
    });

    test('should throw if quantity is zero or negative', () => {
        expect(() => manager.addStock('item-B', 0)).toThrow();
        expect(() => manager.addStock('item-B', -5)).toThrow();
    });
});
