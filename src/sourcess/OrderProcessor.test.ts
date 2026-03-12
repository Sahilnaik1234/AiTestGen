import { OrderProcessor, Order } from './OrderProcessor';

describe('OrderProcessor', () => {
    let orderProcessor: OrderProcessor;

    beforeEach(() => {
        orderProcessor = new OrderProcessor();
    });

    describe('createOrder', () => {
        it('should create a new order with the given ID and items', () => {
            const id = '123';
            const items = [{ name: 'Item 1', qty: 2, price: 10.99 }];
            const order = orderProcessor.createOrder(id, items);
            expect(order.id).toBe(id);
            expect(order.items).toEqual(items);
            expect(order.status).toBe('pending');
        });

        it('should throw an error if the ID is empty or items are empty', () => {
            expect(() => orderProcessor.createOrder('', [{ name: 'Item 1', qty: 2, price: 10.99 }])).toThrowError('Order must have an ID and at least one item');
            expect(() => orderProcessor.createOrder('123', [])).toThrowError('Order must have an ID and at least one item');
        });
    });

    describe('applyDiscount', () => {
        it('should apply a discount to an existing order', () => {
            const id = '123';
            const items = [{ name: 'Item 1', qty: 2, price: 10.99 }];
            orderProcessor.createOrder(id, items);
            const discount = 10;
            expect(orderProcessor.applyDiscount(id, discount)).toBe(true);
            const order = orderProcessor.getOrder(id);
            expect(order?.discount).toBe(discount);
        });

        it('should return false if the order does not exist', () => {
            expect(orderProcessor.applyDiscount('123', 10)).toBe(false);
        });

        it('should return false if the discount is invalid', () => {
            const id = '123';
            const items = [{ name: 'Item 1', qty: 2, price: 10.99 }];
            orderProcessor.createOrder(id, items);
            expect(orderProcessor.applyDiscount(id, -1)).toBe(false);
            expect(orderProcessor.applyDiscount(id, 101)).toBe(false);
        });
    });

    describe('calculateTotal', () => {
        it('should calculate the total cost of an order', () => {
            const id = '123';
            const items = [{ name: 'Item 1', qty: 2, price: 10.99 }, { name: 'Item 2', qty: 3, price: 5.99 }];
            orderProcessor.createOrder(id, items);
            const total = orderProcessor.calculateTotal(id);
            expect(total).toBe(2 * 10.99 + 3 * 5.99);
        });

        it('should calculate the total cost of an order with a discount', () => {
            const id = '123';
            const items = [{ name: 'Item 1', qty: 2, price: 10.99 }, { name: 'Item 2', qty: 3, price: 5.99 }];
            orderProcessor.createOrder(id, items);
            orderProcessor.applyDiscount(id, 10);
            const total = orderProcessor.calculateTotal(id);
            expect(total).toBe((2 * 10.99 + 3 * 5.99) * 0.9);
        });

        it('should return -1 if the order does not exist', () => {
            expect(orderProcessor.calculateTotal('123')).toBe(-1);
        });
    });

    describe('confirmOrder', () => {
        it('should confirm an existing order', () => {
            const id = '123';
            const items = [{ name: 'Item 1', qty: 2, price: 10.99 }];
            orderProcessor.createOrder(id, items);
            expect(orderProcessor.confirmOrder(id)).toBe(true);
            const order = orderProcessor.getOrder(id);
            expect(order?.status).toBe('confirmed');
        });

        it('should return false if the order does not exist', () => {
            expect(orderProcessor.confirmOrder('123')).toBe(false);
        });

        it('should return false if the order is not pending', () => {
            const id = '123';
            const items = [{ name: 'Item 1', qty: 2, price: 10.99 }];
            orderProcessor.createOrder(id, items);
            orderProcessor.confirmOrder(id);
            expect(orderProcessor.confirmOrder(id)).toBe(false);
        });
    });

    describe('shipOrder', () => {
        it('should ship a confirmed order', () => {
            const id = '123';
            const items = [{ name: 'Item 1', qty: 2, price: 10.99 }];
            orderProcessor.createOrder(id, items);
            orderProcessor.confirmOrder(id);
            expect(orderProcessor.shipOrder(id)).toBe(true);
            const order = orderProcessor.getOrder(id);
            expect(order?.status).toBe('shipped');
        });

        it('should return false if the order does not exist', () => {
            expect(orderProcessor.shipOrder('123')).toBe(false);
        });

        it('should return false if the order is not confirmed', () => {
            const id = '123';
            const items = [{ name: 'Item 1', qty: 2, price: 10.99 }];
            orderProcessor.createOrder(id, items);
            expect(orderProcessor.shipOrder(id)).toBe(false);
        });
    });

    describe('cancelOrder', () => {
        it('should cancel an existing order', () => {
            const id = '123';
            const items = [{ name: 'Item 1', qty: 2, price: 10.99 }];
            orderProcessor.createOrder(id, items);
            expect(orderProcessor.cancelOrder(id)).toBe(true);
            const order = orderProcessor.getOrder(id);
            expect(order?.status).toBe('cancelled');
        });

        it('should return false if the order does not exist', () => {
            expect(orderProcessor.cancelOrder('123')).toBe(false);
        });

        it('should return false if the order is shipped', () => {
            const id = '123';
            const items = [{ name: 'Item 1', qty: 2, price: 10.99 }];
            orderProcessor.createOrder(id, items);
            orderProcessor.confirmOrder(id);
            orderProcessor.shipOrder(id);
            expect(orderProcessor.cancelOrder(id)).toBe(false);
        });
    });

    describe('getOrdersByStatus', () => {
        it('should return all orders with the given status', () => {
            const id1 = '123';
            const items1 = [{ name: 'Item 1', qty: 2, price: 10.99 }];
            orderProcessor.createOrder(id1, items1);
            const id2 = '456';
            const items2 = [{ name: 'Item 2', qty: 3, price: 5.99 }];
            orderProcessor.createOrder(id2, items2);
            orderProcessor.confirmOrder(id2);
            const orders = orderProcessor.getOrdersByStatus('pending');
            expect(orders.length).toBe(1);
            expect(orders[0].id).toBe(id1);
        });
    });

    describe('getOrder', () => {
        it('should return an existing order', () => {
            const id = '123';
            const items = [{ name: 'Item 1', qty: 2, price: 10.99 }];
            orderProcessor.createOrder(id, items);
            const order = orderProcessor.getOrder(id);
            expect(order?.id).toBe(id);
            expect(order?.items).toEqual(items);
        });

        it('should return undefined if the order does not exist', () => {
            expect(orderProcessor.getOrder('123')).toBeUndefined();
        });
    });
});