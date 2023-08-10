import express, { json, query } from "express";
import { productManager } from "./productManager.js";



const app = express()

const PORT = 4000



app.get('/products', async (req, res) => {
    const products = await productManager.getProducts()

    const { category } = req.query

    const productos = products.filter( prod => prod.category === category)

    res.send(productos)
});

app.get('/products/:id', async(req, res)=>{
    const products = await productManager.getProducts()

    const prod = products.find( prod => prod.id === parseInt(req.params.id))
    res.send(prod)
})

app.listen(PORT, ()=>{
    console.log(`server on port ${PORT} `)
})

 
 















