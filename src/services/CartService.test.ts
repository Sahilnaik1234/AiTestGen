import { CartService, CartItem } from './CartService';

describe('CartService', () => {
    let cartService: CartService;

    beforeEach(() => {
        cartService = new CartService();
    });

    it('should add item to cart', () => {
        const userId = 'user1';
        const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
        cartService.addItem(userId, item);
        const cart = cartService.getCart(userId);
        expect(cart.length).toBe(1);
        expect(cart[0].productId).toBe(item.productId);
        expect(cart[0].name).toBe(item.name);
        expect(cart[0].price).toBe(item.price);
        expect(cart[0].quantity).toBe(item.quantity);
    });

    it('should throw error when adding item with invalid quantity', () => {
        const userId = 'user1';
        const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 0 };
        expect(() => cartService.addItem(userId, item)).toThrowError('Invalid cart item or user');
    });

    it('should throw error when adding item with invalid price', () => {
        const userId = 'user1';
        const item: CartItem = { productId: 'product1', name: 'Product 1', price: -10.99, quantity: 2 };
        expect(() => cartService.addItem(userId, item)).toThrowError('Invalid cart item or user');
    });

    it('should throw error when adding item with invalid user id', () => {
        const userId = '';
        const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
        expect(() => cartService.addItem(userId, item)).toThrowError('Invalid cart item or user');
    });

    it('should remove item from cart', () => {
        const userId = 'user1';
        const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
        cartService.addItem(userId, item);
        expect(cartService.removeItem(userId, item.productId)).toBe(true);
        const cart = cartService.getCart(userId);
        expect(cart.length).toBe(0);
    });

    it('should return false when removing non-existent item', () => {
        const userId = 'user1';
        expect(cartService.removeItem(userId, 'product1')).toBe(false);
    });

    it('should update quantity of item in cart', () => {
        const userId = 'user1';
        const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
        cartService.addItem(userId, item);
        cartService.updateQuantity(userId, item.productId, 3);
        const cart = cartService.getCart(userId);
        expect(cart[0].quantity).toBe(3);
    });

    it('should return false when updating quantity of non-existent item', () => {
        const userId = 'user1';
        expect(cartService.updateQuantity(userId, 'product1', 3)).toBe(false);
    });

    it('should return false when updating quantity to invalid value', () => {
        const userId = 'user1';
        const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
        cartService.addItem(userId, item);
        expect(cartService.updateQuantity(userId, item.productId, 0)).toBe(false);
    });

    it('should get cart items', () => {
        const userId = 'user1';
        const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
        cartService.addItem(userId, item);
        const cart = cartService.getCart(userId);
        expect(cart.length).toBe(1);
        expect(cart[0].productId).toBe(item.productId);
        expect(cart[0].name).toBe(item.name);
        expect(cart[0].price).toBe(item.price);
        expect(cart[0].quantity).toBe(item.quantity);
    });

    it('should get total cost of cart', () => {
        const userId = 'user1';
        const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
        cartService.addItem(userId, item);
        expect(cartService.getTotal(userId)).toBe(21.98);
    });

    it('should clear cart', () => {
        const userId = 'user1';
        const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
        cartService.addItem(userId, item);
        cartService.clearCart(userId);
        const cart = cartService.getCart(userId);
        expect(cart.length).toBe(0);
    });

    it('should get item count in cart', () => {
        const userId = 'user1';
        const item: CartItem = { productId: 'product1', name: 'Product 1', price: 10.99, quantity: 2 };
        cartService.addItem(userId, item);
        expect(cartService.getItemCount(userId)).toBe(2);
    });
});