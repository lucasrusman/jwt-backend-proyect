
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const conexion = require("../database")

class Servidor{
    constructor(){

        //Iniciamos express
        this.app = express()

        //Puerto
        this.port = process.env.PORT || 3000
        this.app.use(cors())

        // Llamar a la base de datos
        this.conectarDB()

        //MiddleWares
        this.middlewares()

        //Rutas del archivo
        this.rutas()
    }

    async conectarDB(){
        await conexion
    }



    middlewares(){
        //Directorio publico (public)
        this.app.use(cors())
        this.app.use(express.json())
        //para procesar datos enviados desde forms
        this.app.use(express.urlencoded({extended:true}))
        //para poder trabajar con las cookies
        this.app.use(cookieParser())
        //Para eliminar la cache
        this.app.use(function(req, res, next) {
            if (!req.user)
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            next();
        });

    }

    rutas(){
        this.app.use('', require('../routes/path'))
    }
    listen(){
        this.app.listen(this.port, () =>{
            console.log("El servidor esta corriendo en el puerto", this.port)
        })
    }
}



module.exports = Servidor;