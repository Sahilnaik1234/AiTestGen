export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export class CartService {
    private carts: Map<string, CartItem[]> = new Map();

    addItem(userId: string, item: CartItem): void {
        if (!userId || item.quantity <= 0 || item.price < 0) {
            throw new Error('Invalid cart item or user');
        }
        const cart = this.carts.get(userId) ?? [];
        const existing = cart.find(i => i.productId === item.productId);
        if (existing) {
            existing.quantity += item.quantity;
        } else {
            cart.push({ ...item });
        }
        this.carts.set(userId, cart);
    }

    removeItem(userId: string, productId: string): boolean {
        const cart = this.carts.get(userId);
        if (!cart) return false;
        const idx = cart.findIndex(i => i.productId === productId);
        if (idx === -1) return false;
        cart.splice(idx, 1);
        return true;
    }

    updateQuantity(userId: string, productId: string, quantity: number): boolean {
        if (quantity <= 0) return false;
        const cart = this.carts.get(userId);
        if (!cart) return false;
        const item = cart.find(i => i.productId === productId);
        if (!item) return false;
        item.quantity = quantity;
        return true;
    }

    getCart(userId: string): CartItem[] {
        return this.carts.get(userId) ?? [];
    }

    getTotal(userId: string): number {
        return (this.carts.get(userId) ?? [])
            .reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    clearCart(userId: string): void {
        this.carts.delete(userId);
    }

    getItemCount(userId: string): number {
        return (this.carts.get(userId) ?? [])
            .reduce((sum, item) => sum + item.quantity, 0);
    }
}
