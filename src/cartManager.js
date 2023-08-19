import { error } from 'console';
import { promises as fs } from 'fs';

const cartPath = './cart.json';

class CartManager {
    constructor() {
        this.cartPath = cartPath;
    }

    async createCart() {
        try{
            const carrito = [{id: 1, products: []}]

            const cart = JSON.parse(await fs.writeFile(cartPath, JSON.stringify(carrito)))

            return cart

        } catch{
            console.error(error)
        }

    }

    async getCart(cid) {
        try {
            const getCart = JSON.parse(await fs.readFile(this.cartPath, 'utf-8'));
    
            const getCartbyId = getCart.find(c => c.id === cid);
    
            if (getCartbyId) {
                return getCartbyId;
            } else {
                console.error("Carrito no encontrado");
                return null;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cartData = await fs.readFile(cartPath, 'utf-8');
            const cartInfo = JSON.parse(cartData);
            const cartIndex = cartInfo.findIndex(c => c.id === cartId);
            
            if (cartIndex !== -1) {
                const cart = cartInfo[cartIndex];
                const existingProductIndex = cart.products.findIndex(p => p.product === productId);
                
                if (existingProductIndex !== -1) {
                    cart.products[existingProductIndex].quantity++;
                } else {
                    cart.products.push({ product: productId, quantity: 1 });
                }
    
                await fs.writeFile(cartPath, JSON.stringify(cartInfo)); // No need for JSON.parse here
                return cart;
            } else {
                return null; // Cart not found
            }
        } catch (error) {
            throw error;
        }
    }
    

}

const cartManager = new CartManager

export default cartManager;
