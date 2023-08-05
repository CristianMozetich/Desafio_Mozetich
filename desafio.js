import { promises as fs } from 'fs'
import { join } from 'path'

const path = './productos.json'

class ProductManager {
    constructor (){
        this.path = path
    }

    getProducts = async ()=> {
        const prods = JSON.parse( await fs.readFile(path, 'utf-8'))

        console.log(prods)
    }

    addProducto = async (product)=> {
        const prods = JSON.parse( await fs.readFile(path, 'utf-8'))

        const producto = prods.find( p => p.id === product.id)

        if(producto){
            console.log("Producto ya encontrado")
        } else{
            prods.push(product)
            await fs.writeFile(path, JSON.stringify(prods)) // para modificar un array debo pisar el contenido anterior.
            console.log(prods) // agrege para que se vea el array de productos en la consola
        }

    }


    getProductById = async(id)=>{
        const prods =  JSON.parse (await fs.readFile(path, 'utf-8'))

        const productoById = prods.find( p => p.id === id)

        if(productoById){
            console.log(productoById)
        } else {
            console.log("Producto no encontrado")
        }

    }

    updateProduct = async (id, product)=>{
        const prods = JSON.parse ( await fs.readFile(path, 'utf-8'))

        const productByIndex = prods.findIndex( p => p.id === id)

        if(productByIndex != -1){
            prods[productByIndex].title = product.title
            prods[productByIndex].description = product.description
            prods[productByIndex].price = product.price
            prods[productByIndex].thumbnail = product.thumbnail
            prods[productByIndex].code = product.code
            prods[productByIndex].stock = product.stock

            await fs.writeFile(path, JSON.stringify(prods))
        } else{
            console.log("Producto no encontrado")
        }
    }

    deleteProducts = async (id)=>{
        const prods = JSON.parse ( await fs.readFile (path, 'utf-8'))

        const deleteProd = prods.find ( p => p.id === id)

        if(deleteProd){
            await fs.writeFile (path, JSON.stringify( prods.filter( p => p.id != id )))
        }else{
            console.log("Producto no encontrado")
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock,
        this.id = Product.incrementarId()
    }

    static incrementarId(){
        if(this.idIncrement){
            this.idIncrement++
        } else{
            this.idIncrement = 1
        }
        return this.idIncrement
    }

}

const producto1 = new Product ("taragui", "buena", 12, [], "YE123", 25)
const producto2 = new Product ("Dulce de leche", "Mar del plata", 10, [], "DL123", 10)
const producto3 = new Product ("Alfajor", "Jorgito", 3, [], "A123", 15)


const productManager = new ProductManager()



productManager.addProducto(producto1)















