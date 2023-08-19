import { Router } from "express";
import { productManager } from "../productManager.js";
import { error } from "console";


const prodsRouter = Router()

prodsRouter.get('/', async (req,res)=>{
    try{
        const products = await productManager.getProducts()

        const { limit } = req.query
    
        const productos = products.slice( 0, limit )
    
        res.status(200).send(productos)

    } catch{
        console.error(error)
    }
})

prodsRouter.get('/:id', async (req,res)=>{
    try{
        const products = await productManager.getProducts()

        const prod = products.find ( p => p.id === parseInt(req.params.id))

        res.status(200).send(prod)

    }catch{
        res.status(404).send("Producto no encontrado")
    }
})



prodsRouter.post('/', async (req,res)=>{ 
    const {id} = req.body
    const confirmacion = await productManager.getProductById(id)

    if ( confirmacion ){
        res.status(404).send("Producto ya creado")
    } else{
        const conf = await productManager.addProducto(req.body)
        if(conf){
        res.status(200).send("Producto creado")
        }
    }
})



prodsRouter.put('/:id', async (req,res)=>{
    const {id} = req.params

    const confirmacion = await productManager.getProductById(parseInt(id))

    if(confirmacion){
        await productManager.updateProduct(parseInt(id), req.body)
        res.status(200).send("Producto actualizado")

    } else{
        res.status(404).send("Producto No Encontrado")
    }
})

prodsRouter.delete('/:id', async(req,res)=>{
    const {id} = req.params

    const confirmacion = await productManager.getProductById(parseInt(id))
    if(confirmacion){
        await productManager.deleteProducts(parseInt(id))
        res.status(200).send("Producto Eliminado")
    } else {
        res.status(404).send("Producto No Encontrado")
    }
})

export default prodsRouter