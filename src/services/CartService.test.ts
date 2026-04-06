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

    describe('addItem', () => {
        it('should add an item to the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.getCart('user1')).toEqual([item]);
        });

        it('should throw an error if the user ID is empty', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            expect(() => cartService.addItem('', item)).toThrowError('Invalid cart item or user');
        });

        it('should throw an error if the item quantity is less than or equal to 0', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 0 };
            expect(() => cartService.addItem('user1', item)).toThrowError('Invalid cart item or user');
        });

        it('should throw an error if the item price is less than 0', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: -10, quantity: 1 };
            expect(() => cartService.addItem('user1', item)).toThrowError('Invalid cart item or user');
        });

        it('should add multiple items to the cart', () => {
            const item1: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            const item2: CartItem = { productId: '2', name: 'Test2', price: 20, quantity: 1 };
            cartService.addItem('user1', item1);
            cartService.addItem('user1', item2);
            expect(cartService.getCart('user1')).toEqual([item1, item2]);
        });

        it('should update the quantity of an existing item in the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            cartService.addItem('user1', item);
            expect(cartService.getCart('user1')).toEqual([{ ...item, quantity: 2 }]);
        });
    });

    describe('removeItem', () => {
        it('should remove an item from the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            cartService.removeItem('user1', item.productId);
            expect(cartService.getCart('user1')).toEqual([]);
        });

        it('should return false if the user does not have a cart', () => {
            expect(cartService.removeItem('user1', '1')).toBe(false);
        });

        it('should return false if the item is not in the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.removeItem('user1', '2')).toBe(false);
        });
    });

    describe('updateQuantity', () => {
        it('should update the quantity of an item in the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            cartService.updateQuantity('user1', item.productId, 2);
            expect(cartService.getCart('user1')).toEqual([{ ...item, quantity: 2 }]);
        });

        it('should return false if the quantity is less than or equal to 0', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.updateQuantity('user1', item.productId, 0)).toBe(false);
        });

        it('should return false if the user does not have a cart', () => {
            expect(cartService.updateQuantity('user1', '1', 2)).toBe(false);
        });

        it('should return false if the item is not in the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.updateQuantity('user1', '2', 2)).toBe(false);
        });
    });

    describe('getTotal', () => {
        it('should return the total cost of the items in the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.getTotal('user1')).toBe(10);
        });

        it('should return 0 if the cart is empty', () => {
            expect(cartService.getTotal('user1')).toBe(0);
        });
    });

    describe('clearCart', () => {
        it('should clear the cart', () => {
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
            expect(cartService.getItemCount('user1')).toBe(1);
        });

        it('should return 0 if the cart is empty', () => {
            expect(cartService.getItemCount('user1')).toBe(0);
        });
    });
});