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

    describe('removeItem', () => {
        it('should remove an item from the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.removeItem('user1', '1')).toBe(true);
            expect(cartService.getCart('user1')).toEqual([]);
        });

        it('should return false if the cart is empty', () => {
            expect(cartService.removeItem('user1', '1')).toBe(false);
        });

        it('should return false if the item is not found', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.removeItem('user1', '2')).toBe(false);
        });
    });

    describe('updateQuantity', () => {
        it('should update the quantity of an item', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.updateQuantity('user1', '1', 2)).toBe(true);
            expect(cartService.getCart('user1')[0].quantity).toBe(2);
        });

        it('should return false if the quantity is invalid', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.updateQuantity('user1', '1', 0)).toBe(false);
            expect(cartService.updateQuantity('user1', '1', -1)).toBe(false);
        });

        it('should return false if the item is not found', () => {
            expect(cartService.updateQuantity('user1', '1', 2)).toBe(false);
        });

        it('should return false if the cart is empty', () => {
            expect(cartService.updateQuantity('user1', '1', 2)).toBe(false);
        });
    });

    describe('getCart', () => {
        it('should return the cart for a user', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.getCart('user1')).toEqual([item]);
        });

        it('should return an empty array if the cart is empty', () => {
            expect(cartService.getCart('user1')).toEqual([]);
        });
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