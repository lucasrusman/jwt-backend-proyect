const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get("/api", function (req, res) {
    res.json({
        msg: "hola"
    })
})

app.post("/api/login", function (req, res) {
    const user = req.body
    console.log(user)

    jwt.sign({user}, 'secretkey', {expiresIn: '10s'} , (err, token)=>{
        console.log("asdads")
        res.json({
            token
        })
    })  
})


const verifyToken = (req, res, next)=>{
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403)
    }

}
app.post("/api/posts", verifyToken , function (req, res) {
    
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
            res.sendStatus(403)
        }else{
            res.json({
                msg: "Post creado",
                authData
            })
        }
    })
    
})


app.listen(3000, function () {
    console.log('app running');
})