import { CartService, CartItem } from './CartService';

describe('CartService', () => {
    let cartService: CartService;

    beforeEach(() => {
        cartService = new CartService();
    });



    describe('getTotal', () => {
        it('should return the total cost of the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.getTotal('user1')).toBe(10);
        });

        it('should return 0 if the cart is empty', () => {
            expect(cartService.getTotal('user1')).toBe(0);
        });
    });

    describe('clearCart', () => {
        it('should clear the cart for a user', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            cartService.clearCart('user1');
            expect(cartService.getCart('user1')).toEqual([]);
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