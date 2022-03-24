const { request, response } = require('express')
const jwt = require('jsonwebtoken')


const validarJWT = async(req = request, res = response, next) =>{
    const token = req.header('Authorization')
    if(!token){
        res.status(401).json({
            msg: 'No tiene permiso para accerder'
        })
    }
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(" ")[1];
            req.token = bearerToken
            next()
        }else{
            res.sendStatus(403)
        }

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


        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }


}

module.exports= {
    validarJWT
}