import { OrderProcessor } from './OrderProcessor';

describe('OrderProcessor', () => {
    let processor: OrderProcessor;

    beforeEach(() => {
        processor = new OrderProcessor();
    });

    // ~20% coverage: only tests createOrder basic happy path
    test('should create a valid order', () => {
        const order = processor.createOrder('order-1', [{ name: 'Widget', qty: 2, price: 10 }]);
        expect(order.id).toBe('order-1');
        expect(order.status).toBe('pending');
    });

    test('should throw when creating order with empty items', () => {
        expect(() => processor.createOrder('order-2', [])).toThrow();
    });
});
