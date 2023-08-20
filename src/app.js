import express from "express";
import prodsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import { __dirname } from "./path.js";
import path from "path";
import multer from "multer";

const app = express()

const PORT = 8080

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




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

//Routes
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartRouter)
app.use('/static', express.static(path.join(__dirname, '/public')));

app.post('/upload', upload.single('product'), (req, res)=>{
console.log(req.file)
console.log(req.body)
    res.status(200).send("imagen cargada")
})




app.listen(PORT, ()=>{
    console.log( `server on port ${PORT} `)
})















