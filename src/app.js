const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
app.use(cors())


const { validarJWT } = require('./middlewars/validar-jwt')

app.get("/api", function (req, res) {
    res.json({
        msg: "hola"
    })
})

app.post("/api/login", validarJWT,function (req, res) {

})


app.listen(3000, function () {
    console.log('app running');
})