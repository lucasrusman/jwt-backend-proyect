const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database')
const {promisify} = require('util')

//Process to register
const register =  async(req, res)=>{
        console.log("asdfasdffdas");
        const {email, pass} = req.body
        console.log(email, pass);
        let passHash = await bcryptjs.hash(pass, 8)
        console.log(passHash);
        conexion.query('INSERT INTO usuario (email, pass) VALUES (?, ?); ', [email, passHash], (error, rows)=>{
            if(error){console.log(error)}
            res.json({Status : "Usuario registrado"})
        })
}

const login = (req, res)=>{
        const {email, pass} = req.body
        console.log(req.body);
        conexion.query('SELECT * FROM usuario WHERE email = ?', [email, pass], (error, rows)=>{
            console.log(rows);
        if( rows.length == 0 || !(bcryptjs.compare(pass, rows[0].pass)) ){
            console.log(rows)
            console.log(error);
            res.json(error)
        }else{
            //inicio de sesión OK
            const token = jwt.sign({email, pass}, "super_secret", {
                expiresIn: "20s"
            })
            console.log("TOKEN: "+token+" para el Email : "+email)
            const cookiesOptions = {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: true
                }
            res.cookie('jwt', token, cookiesOptions)
            res.json(rows[0])
        }
    })
}

const isAuthenticated = (req, res, next)=>{
    if (req.cookies.jwt) {
        console.log(req.cookies.jwt);
        const decodificada = jwt.verify(req.cookies.jwt, "super_secret")
        console.log(decodificada);
        conexion.query('SELECT * FROM usuario WHERE email = ? AND pass = ?', [decodificada.email,decodificada.pass], (error, rows)=>{
            if(!rows){return next()}
            //req.user = rows[0]
            console.log("token valido")
            console.log(error);
            return next()
        })
    }else{
        res.json({Status : "Token no activo"})
        res.redirect('')
        return next()
    }
}

const logout = (req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('')
}


module.exports = {register, login, isAuthenticated, logout}