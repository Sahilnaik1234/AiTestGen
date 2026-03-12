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

    describe('removeItem', () => {
        it('should remove an item from the cart', () => {
            const userId = 'user1';
            const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
            cartService.addItem(userId, item);
            expect(cartService.removeItem(userId, item.productId)).toBe(true);
            expect(cartService.getCart(userId)).toEqual([]);
        });

        it('should return false if the item is not found', () => {
            const userId = 'user1';
            const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
            cartService.addItem(userId, item);
            expect(cartService.removeItem(userId, 'product2')).toBe(false);
        });

        it('should return false if the cart is empty', () => {
            const userId = 'user1';
            expect(cartService.removeItem(userId, 'product1')).toBe(false);
        });
    });

    describe('updateQuantity', () => {
        it('should update the quantity of an item', () => {
            const userId = 'user1';
            const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
            cartService.addItem(userId, item);
            cartService.updateQuantity(userId, item.productId, 3);
            expect(cartService.getCart(userId)[0].quantity).toBe(3);
        });

        it('should return false if the quantity is invalid', () => {
            const userId = 'user1';
            const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
            cartService.addItem(userId, item);
            expect(cartService.updateQuantity(userId, item.productId, 0)).toBe(false);
        });

        it('should return false if the item is not found', () => {
            const userId = 'user1';
            const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
            cartService.addItem(userId, item);
            expect(cartService.updateQuantity(userId, 'product2', 3)).toBe(false);
        });

        it('should return false if the cart is empty', () => {
            const userId = 'user1';
            expect(cartService.updateQuantity(userId, 'product1', 3)).toBe(false);
        });
    });

    describe('getCart', () => {
        it('should return the cart for a user', () => {
            const userId = 'user1';
            const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
            cartService.addItem(userId, item);
            expect(cartService.getCart(userId)).toEqual([item]);
        });

        it('should return an empty array if the cart is empty', () => {
            const userId = 'user1';
            expect(cartService.getCart(userId)).toEqual([]);
        });
    });

    describe('getTotal', () => {
        it('should return the total cost of the cart', () => {
            const userId = 'user1';
            const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
            cartService.addItem(userId, item);
            expect(cartService.getTotal(userId)).toBe(21.98);
        });

        it('should return 0 if the cart is empty', () => {
            const userId = 'user1';
            expect(cartService.getTotal(userId)).toBe(0);
        });
    });

    describe('clearCart', () => {
        it('should clear the cart for a user', () => {
            const userId = 'user1';
            const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
            cartService.addItem(userId, item);
            cartService.clearCart(userId);
            expect(cartService.getCart(userId)).toEqual([]);
        });
    });

    describe('getItemCount', () => {
        it('should return the total quantity of items in the cart', () => {
            const userId = 'user1';
            const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
            cartService.addItem(userId, item);
            expect(cartService.getItemCount(userId)).toBe(2);
        });

        it('should return 0 if the cart is empty', () => {
            const userId = 'user1';
            expect(cartService.getItemCount(userId)).toBe(0);
        });
    });
});