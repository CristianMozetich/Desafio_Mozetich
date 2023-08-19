import { Router } from 'express';
import cartManager from '../cartManager.js';



const cartRouter = Router();



cartRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).send("Ha ocurrido un error.");
    }
});

cartRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cartProducts = await cartManager.getCartProducts(cid);
        res.status(200).json(cartProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Ha ocurrido un error.");
    }
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const addedProduct = await cartManager.addProductToCart(cid, pid);
        res.status(201).json(addedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Ha ocurrido un error.");
    }
});


export default cartRouter