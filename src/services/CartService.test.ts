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

        it('should return the total cost of multiple items in the cart', () => {
            const item1: CartItem = { productId: '1', name: 'Test1', price: 10, quantity: 1 };
            const item2: CartItem = { productId: '2', name: 'Test2', price: 20, quantity: 1 };
            cartService.addItem('user1', item1);
            cartService.addItem('user1', item2);
            expect(cartService.getTotal('user1')).toBe(30);
        });

        it('should return the total cost of multiple quantities of the same item', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 2 };
            cartService.addItem('user1', item);
            expect(cartService.getTotal('user1')).toBe(20);
        });
    });

    describe('clearCart', () => {
        it('should clear the cart for a user', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            cartService.clearCart('user1');
            expect(cartService.getCart('user1')).toEqual([]);
        });

        it('should not throw an error if the cart is already empty', () => {
            expect(() => cartService.clearCart('user1')).not.toThrow();
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

        it('should return the total quantity of multiple items in the cart', () => {
            const item1: CartItem = { productId: '1', name: 'Test1', price: 10, quantity: 1 };
            const item2: CartItem = { productId: '2', name: 'Test2', price: 20, quantity: 2 };
            cartService.addItem('user1', item1);
            cartService.addItem('user1', item2);
            expect(cartService.getItemCount('user1')).toBe(3);
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
            expect(() => cartService.addItem('', item)).toThrow('Invalid cart item or user');
        });

        it('should throw an error if the item quantity is less than or equal to 0', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 0 };
            expect(() => cartService.addItem('user1', item)).toThrow('Invalid cart item or user');
        });

        it('should throw an error if the item price is less than 0', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: -10, quantity: 1 };
            expect(() => cartService.addItem('user1', item)).toThrow('Invalid cart item or user');
        });

        it('should add multiple items to the cart', () => {
            const item1: CartItem = { productId: '1', name: 'Test1', price: 10, quantity: 1 };
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

        it('should return false if the cart is empty', () => {
            expect(cartService.removeItem('user1', '1')).toBe(false);
        });

        it('should return false if the item is not found in the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.removeItem('user1', '2')).toBe(false);
        });

        it('should remove an item from the cart and return true', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.removeItem('user1', item.productId)).toBe(true);
        });
    });

    describe('updateQuantity', () => {
        it('should update the quantity of an item in the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            cartService.updateQuantity('user1', item.productId, 2);
            expect(cartService.getCart('user1')).toEqual([{ ...item, quantity: 2 }]);
        });

        it('should return false if the cart is empty', () => {
            expect(cartService.updateQuantity('user1', '1', 2)).toBe(false);
        });

        it('should return false if the item is not found in the cart', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.updateQuantity('user1', '2', 2)).toBe(false);
        });

        it('should return false if the new quantity is less than or equal to 0', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.updateQuantity('user1', item.productId, 0)).toBe(false);
        });

        it('should update the quantity of an item in the cart and return true', () => {
            const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
            cartService.addItem('user1', item);
            expect(cartService.updateQuantity('user1', item.productId, 2)).toBe(true);
        });
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
});