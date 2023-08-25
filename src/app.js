import express from "express";
import prodsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import { __dirname } from "./path.js";
import path from "path";
import multer from "multer";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { productManager } from "./productManager.js";



const app = express()

const PORT = 8080

const serverExpress = app.listen(PORT, ()=>{
    console.log( `server on port ${PORT} `)
})




//Config Multer
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'src/public/img')
    },
    filename: ( req, file, cb )=>{
        cb(null, `${Date.now()}${file.originalname}`) //concateno el nombre original de mi archivo con milisegundos Date.now()
    }
})
const upload = multer({storage: storage})



//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine()) //DEFINO QUE MOTOR DE PLANTILLAS VOY A UTILIZAR Y SU CONFIGURACION
app.set('view engine', 'handlebars') //Setting de handlebars
app.set('views', path.resolve(__dirname, './views') ) //RUTA DE MIS VISTAS


app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartRouter)


//Server Socket.io
const io = new Server(serverExpress)


io.on('connection', (socket)=>{
    console.log("Servidor socket.io conectado")

    socket.on('mensajeConexion', (info)=>{
        console.log(info)
    })


    socket.on('nuevoProducto', (nuevoProd)=>{
        const prods = productManager.addProducto(nuevoProd)
        socket.emit('prods', prods)
    })
})




//Routes
app.get('/static', async (req, res) => {
    try {
        const products = await productManager.getProducts(); 

        res.render('realTimeProducts', {
            js: "realTimeProducts.js",
            css: "style.css"
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error al obtener los productos');
    }
});



app.post('/upload', upload.single('product'), (req, res)=>{
console.log(req.file)
console.log(req.body)
    res.status(200).send("imagen cargada")
})



















