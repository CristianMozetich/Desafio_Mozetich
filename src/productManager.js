import { error } from 'console'
import { promises as fs } from 'fs'


const path = './productos.json'


class Product {
    constructor(title, description, price, thumbnail, code, stock, category){
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock,
        this.category = category,
        this.id = Product.incrementarId()
    }

    static incrementarId(){

        try{
            if(this.idIncrement){
                this.idIncrement++
            } else{
                this.idIncrement = 1
            }
            return this.idIncrement

        } catch{
            console.error(error)
        }

    }

}

class ProductManager extends Product {
    constructor (){
        super()
    }

    getProducts = async ()=> {
        try{
            const prods = JSON.parse( await fs.readFile(path, 'utf-8'))

            return prods
            //console.log(prods)

        } catch{
            console.error(error)
        }

    }

    addProducto = async (product)=> {
        try{
            const prods = JSON.parse( await fs.readFile(path, 'utf-8'))

            const producto = prods.find( p => p.code === product.code)
    
            if(producto){
                console.log("Producto ya encontrado")
            } else{
                prods.push(product)
                await fs.writeFile(path, JSON.stringify(prods)) // para modificar un array debo pisar el contenido anterior.
                console.log(prods) // agrege para que se vea el array de productos en la consola
            }

        } catch{
            console.error(error)
        }

    }


    getProductById = async(id)=>{

        try{
            const prods =  JSON.parse (await fs.readFile(path, 'utf-8'))

            const productoById = prods.find( p => p.id === id)
    
            if(productoById){
                return productoById
            } else {
                return null
            }

        } catch {
            console.error(error)
        }

    }

    updateProduct = async (id, product)=>{

        try{
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
        } catch{
            console.error(error)
        }

    }

    deleteProducts = async (id)=>{
        try{
            const prods = JSON.parse ( await fs.readFile (path, 'utf-8'))

            
    
            if(prods){
                const deleteProd = prods.filter ( p => p.id !== id )

                await fs.writeFile(path, JSON.stringify(deleteProd))
            }else{
                console.log("Producto no encontrado")
            }

        } catch{
            console.error(error)
        }
    }
}




export const productManager = new ProductManager()



/*productManager.addProducto(producto1)

productManager.deleteProducts()

productManager.updateProduct(3, {title: "empanada"})*/

