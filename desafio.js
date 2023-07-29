class ProductManager {
    constructor (){
        this.products = []
    }

    addProducto(product){
        const prod = this.products.find(prod => prod.code === product.code)

        if(prod){
            console.log("Producto ya encontrado")
        } else {
            this.products.push(product)
        }
    }

    getProducts(){
        console.log(this.products)
    }

    getProductById(id){
        const prod = this.products.find(prod => prod.id === id)

        if(prod){
            console.log(prod)
        } else{
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


//console.log(producto1, producto2, producto3)

const productManager = new ProductManager()

productManager.addProducto(producto1)
productManager.addProducto(producto2)
productManager.addProducto(producto3)


productManager.getProducts()

productManager.getProductById(3)






