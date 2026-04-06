import { CartService, CartItem } from './CartService';

describe('CartService', () => {
    let cartService: CartService;

    beforeEach(() => {
        cartService = new CartService();
    });

    describe('addItem', () => {
        it('should add a new item to the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.getCart('user1')).toEqual([item]);
        });

        it('should update the quantity of an existing item', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            cartService.addItem('user1', item);
            expect(cartService.getCart('user1')[0].quantity).toBe(2);
        });

        it('should throw an error for invalid input', () => {
            expect(() => cartService.addItem('', { productId: '1', name: 'Test', price: 10, quantity: 1 })).toThrowError('Invalid cart item or user');
            expect(() => cartService.addItem('user1', { productId: '1', name: 'Test', price: -10, quantity: 1 })).toThrowError('Invalid cart item or user');
            expect(() => cartService.addItem('user1', { productId: '1', name: 'Test', price: 10, quantity: 0 })).toThrowError('Invalid cart item or user');
        });
    });


    describe('getItemCount', () => {
        it('should return the total quantity of items in the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            cartService.addItem('user1', item);
            expect(cartService.getItemCount('user1')).toBe(2);
        });

        it('should return 0 if the cart is empty', () => {
            expect(cartService.getItemCount('user1')).toBe(0);
        });
    });
});