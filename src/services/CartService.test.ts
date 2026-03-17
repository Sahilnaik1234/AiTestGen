import { CartService, CartItem } from './CartService';

describe('CartService', () => {
    let cartService: CartService;

    beforeEach(() => {
        cartService = new CartService();
    });

    it('should add item to cart', () => {
        const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
        cartService.addItem('user1', item);
        expect(cartService.getCart('user1')).toEqual([item]);
    });

    it('should throw error when adding item with invalid quantity', () => {
        const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 0 };
        expect(() => cartService.addItem('user1', item)).toThrowError('Invalid cart item or user');
    });

    it('should throw error when adding item with invalid price', () => {
        const item: CartItem = { productId: '1', name: 'Test', price: -10, quantity: 1 };
        expect(() => cartService.addItem('user1', item)).toThrowError('Invalid cart item or user');
    });

    it('should throw error when adding item with invalid user', () => {
        const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
        expect(() => cartService.addItem('', item)).toThrowError('Invalid cart item or user');
    });

    it('should update quantity of existing item', () => {
        const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
        cartService.addItem('user1', item);
        cartService.addItem('user1', { ...item, quantity: 2 });
        expect(cartService.getCart('user1')[0].quantity).toBe(3);
    });

    it('should remove item from cart', () => {
        const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
        cartService.addItem('user1', item);
        cartService.removeItem('user1', '1');
        expect(cartService.getCart('user1')).toEqual([]);
    });

    it('should return false when removing non-existent item', () => {
        expect(cartService.removeItem('user1', '1')).toBe(false);
    });

    it('should update quantity of item', () => {
        const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
        cartService.addItem('user1', item);
        cartService.updateQuantity('user1', '1', 2);
        expect(cartService.getCart('user1')[0].quantity).toBe(2);
    });

    it('should return false when updating quantity of non-existent item', () => {
        expect(cartService.updateQuantity('user1', '1', 2)).toBe(false);
    });

    it('should return false when updating quantity to invalid value', () => {
        const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
        cartService.addItem('user1', item);
        expect(cartService.updateQuantity('user1', '1', 0)).toBe(false);
    });

    it('should get cart items', () => {
        const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
        cartService.addItem('user1', item);
        expect(cartService.getCart('user1')).toEqual([item]);
    });

    it('should get total cost of cart', () => {
        const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
        cartService.addItem('user1', item);
        expect(cartService.getTotal('user1')).toBe(10);
    });

    it('should clear cart', () => {
        const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
        cartService.addItem('user1', item);
        cartService.clearCart('user1');
        expect(cartService.getCart('user1')).toEqual([]);
    });

    it('should get item count', () => {
        const item: CartItem = { productId: '1', name: 'Test', price: 10, quantity: 1 };
        cartService.addItem('user1', item);
        expect(cartService.getItemCount('user1')).toBe(1);
    });
});