import { CartService, CartItem } from './CartService';

describe('CartService', () => {
    let cartService: CartService;

    beforeEach(() => {
        cartService = new CartService();
    });

    describe('addItem', () => {
        it('should add a new item to the cart', () => {
            const userId = 'user1';
            const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
            cartService.addItem(userId, item);
            expect(cartService.getCart(userId)).toEqual([item]);
        });

        it('should update the quantity of an existing item', () => {
            const userId = 'user1';
            const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
            cartService.addItem(userId, item);
            cartService.addItem(userId, item);
            expect(cartService.getCart(userId)[0].quantity).toBe(4);
        });

        it('should throw an error for invalid user id', () => {
            const userId = '';
            const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
            expect(() => cartService.addItem(userId, item)).toThrowError('Invalid cart item or user');
        });

        it('should throw an error for invalid quantity', () => {
            const userId = 'user1';
            const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 0 };
            expect(() => cartService.addItem(userId, item)).toThrowError('Invalid cart item or user');
        });

        it('should throw an error for invalid price', () => {
            const userId = 'user1';
            const item: CartItem = { productId: 'product1', name: 'Product 1', price: -10.99, quantity: 2 };
            expect(() => cartService.addItem(userId, item)).toThrowError('Invalid cart item or user');
        });
    });
});