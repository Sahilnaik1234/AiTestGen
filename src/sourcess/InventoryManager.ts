export class InventoryManager {
    private stock: Map<string, number> = new Map();
    private reserved: Map<string, number> = new Map();

    addStock(itemId: string, quantity: number): void {
        if (quantity <= 0) throw new Error('Quantity must be positive');
        this.stock.set(itemId, (this.stock.get(itemId) ?? 0) + quantity);
    }

    getStock(itemId: string): number {
        return this.stock.get(itemId) ?? 0;
    }

    reserveStock(itemId: string, quantity: number): boolean {
        const available = this.getStock(itemId) - (this.reserved.get(itemId) ?? 0);
        if (quantity <= 0 || quantity > available) return false;
        this.reserved.set(itemId, (this.reserved.get(itemId) ?? 0) + quantity);
        return true;
    }

    releaseReservation(itemId: string, quantity: number): boolean {
        const currentReserved = this.reserved.get(itemId) ?? 0;
        if (quantity <= 0 || quantity > currentReserved) return false;
        this.reserved.set(itemId, currentReserved - quantity);
        return true;
    }

    fulfillReservation(itemId: string, quantity: number): boolean {
        const currentReserved = this.reserved.get(itemId) ?? 0;
        const currentStock = this.stock.get(itemId) ?? 0;
        if (quantity <= 0 || quantity > currentReserved) return false;
        this.reserved.set(itemId, currentReserved - quantity);
        this.stock.set(itemId, currentStock - quantity);
        return true;
    }

    getAvailable(itemId: string): number {
        return this.getStock(itemId) - (this.reserved.get(itemId) ?? 0);
    }

    isLowStock(itemId: string, threshold: number = 5): boolean {
        return this.getAvailable(itemId) < threshold;
    }

    removeItem(itemId: string): boolean {
        if (!this.stock.has(itemId)) return false;
        this.stock.delete(itemId);
        this.reserved.delete(itemId);
        return true;
    }
}
