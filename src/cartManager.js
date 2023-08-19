import { error } from 'console';
import { promises as fs } from 'fs';

const cartPath = '../cart.json';

class CartManager {
    constructor() {
        this.cartPath = cartPath;
    }

    async createCart() {
        try {
            const newCart = { id: this.generateCartId(), products: [] };
            await this.saveCart(newCart);
            return newCart;
        } catch (error) {
            throw error;
        }
    }

    async getCartProducts(cid) {
        try {
            const cartData = await fs.readFile(this.cartPath, 'utf-8');
            const cartInfo = JSON.parse(cartData);
            const cart = cartInfo.cart.find(c => c.id === cid);
            return cart ? cart.products : [];
        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cartData = await fs.readFile(this.cartPath, 'utf-8');
            const cartInfo = JSON.parse(cartData);
            const cartIndex = cartInfo.cart.findIndex(c => c.id === cid);
            if (cartIndex !== -1) {
                const cart = cartInfo.cart[cartIndex];
                const productIndex = cart.products.findIndex(p => p.product === pid);
                if (productIndex !== -1) {
                    cart.products[productIndex].quantity++;
                } else {
                    cart.products.push({ product: pid, quantity: 1 });
                }
                await this.saveCart(cartInfo);
                return cart;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async saveCart(cartInfo) {
        try {
            await fs.writeFile(this.cartPath, JSON.stringify(cartInfo));
        } catch (error) {
            throw error;
        }
    }

    generateCartId() {

    }

}

const cartManager = new CartManager

export default cartManager;
