const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database')
const {promisify} = require('util')

//Process to register
const register = async (req, res)=>{
    try {
        const {email, pass} = req.body
        let passHash = await bcryptjs.hash(pass, 8)
        conexion.query('INSERT INTO usuario (email, pass) VALUES (?, ?); ', [email, passHash], (error, rows)=>{
            if(error){console.log(error)}
            res.json({Status : "Usuario registrado"})
        })
    } catch (error) {
        console.log(error)
    }
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
                expiresIn: "7d"
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

const isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, "super_secret")
            conexion.query('SELECT * FROM usuario WHERE id = ?', [decodificada.id], (error, rows)=>{
                if(!rows){return next()}
                req.user = rows[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('')
    }
}

const logout = (req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('')
}


module.exports = {register, login, isAuthenticated, logout}