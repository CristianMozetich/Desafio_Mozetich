import express, { json, query } from "express";
import { productManager } from "./productManager.js";



const app = express()

const PORT = 4000



app.get('/products', async (req, res) => {
    try{
        const products = await productManager.getProducts()

        const { limit } = req.query
    
        const productos = products.slice( 0, limit )
    
        res.send(productos)

    } catch{
        console.error(error)
    }


});

app.get('/products/:id', async(req, res)=>{

    try{
        const products = await productManager.getProducts()

        const prod = products.find( prod => prod.id === parseInt(req.params.id))
        res.send(prod)

    } catch{
        console.error(error)
    }

})

app.listen(PORT, ()=>{
    console.log(`server on port ${PORT} `)
})

 
 















