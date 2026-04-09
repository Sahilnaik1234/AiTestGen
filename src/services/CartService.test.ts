import { CartService, CartItem } from './CartService';

describe('CartService', () => {
    let cartService: CartService;

    beforeEach(() => {
        cartService = new CartService();
    });

    describe('getCart', () => {
        it('should return an empty array if the cart is empty', () => {
            expect(cartService.getCart('user1')).toEqual([]);
        });

        it('should return the cart items for a user', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.getCart('user1')).toEqual([item]);
        });
    });

    describe('getItemCount', () => {
        it('should return the total quantity of items in the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.getItemCount('user1')).toBe(1);
        });

        it('should return 0 if the cart is empty', () => {
            expect(cartService.getItemCount('user1')).toBe(0);
        });
    });
});