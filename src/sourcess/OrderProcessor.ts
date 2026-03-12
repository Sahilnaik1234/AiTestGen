export interface Order {
    id: string;
    items: { name: string; qty: number; price: number }[];
    discount?: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'cancelled';
}

export class OrderProcessor {
    private orders: Map<string, Order> = new Map();

    createOrder(id: string, items: Order['items']): Order {
        if (!id || items.length === 0) {
            throw new Error('Order must have an ID and at least one item');
        }
        const order: Order = { id, items, status: 'pending' };
        this.orders.set(id, order);
        return order;
    }

    applyDiscount(orderId: string, discount: number): boolean {
        const order = this.orders.get(orderId);
        if (!order) return false;
        if (discount < 0 || discount > 100) return false;
        order.discount = discount;
        return true;
    }

    calculateTotal(orderId: string): number {
        const order = this.orders.get(orderId);
        if (!order) return -1;
        const subtotal = order.items.reduce((sum, i) => sum + i.qty * i.price, 0);
        const discount = order.discount ?? 0;
        return subtotal * (1 - discount / 100);
    }

    confirmOrder(orderId: string): boolean {
        const order = this.orders.get(orderId);
        if (!order || order.status !== 'pending') return false;
        order.status = 'confirmed';
        return true;
    }

    shipOrder(orderId: string): boolean {
        const order = this.orders.get(orderId);
        if (!order || order.status !== 'confirmed') return false;
        order.status = 'shipped';
        return true;
    }

    cancelOrder(orderId: string): boolean {
        const order = this.orders.get(orderId);
        if (!order || order.status === 'shipped') return false;
        order.status = 'cancelled';
        return true;
    }

    getOrdersByStatus(status: Order['status']): Order[] {
        return Array.from(this.orders.values()).filter(o => o.status === status);
    }

    getOrder(orderId: string): Order | undefined {
        return this.orders.get(orderId);
    }
}
