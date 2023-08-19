import { Router } from 'express';
import cartManager from '../cartManager.js';
import { error } from 'console';



const cartRouter = Router();



cartRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        
        res.status(201).send(newCart);
    } catch {
        console.error(error);
        res.status(404).send("Ha ocurrido un error.");
    }
});

cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await cartManager.getCart(cartId);

        if (cart) {
            res.status(200).send(cart);
        } else {
            res.status(404).send("No se encuentra el carrito");
        }
    } catch (error) {
        res.status(500).send("Ha ocurrido un error");
        console.error(error);
    }
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    
    try {
        const cart = await cartManager.addProductToCart(cartId, productId);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).send("No se encontró el carrito");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Ha ocurrido un error.");
    }
});




export default cartRouter