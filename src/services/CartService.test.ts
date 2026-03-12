import { CartService } from './CartService';

describe('CartService', () => {
    let service: CartService;

    beforeEach(() => {
        service = new CartService();
    });

    // ~20% coverage: only tests addItem() and getCart()
    test('should add a new item to the cart', () => {
        service.addItem('user-1', { productId: 'prod-1', name: 'Widget', price: 9.99, quantity: 1 });
        const cart = service.getCart('user-1');
        expect(cart).toHaveLength(1);
        expect(cart[0].name).toBe('Widget');
    });

    test('should throw if quantity is zero or negative', () => {
        expect(() =>
            service.addItem('user-1', { productId: 'prod-1', name: 'Widget', price: 9.99, quantity: 0 })
        ).toThrow();
    });
});
