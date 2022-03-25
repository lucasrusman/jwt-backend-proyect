const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database')
const {promisify} = require('util')

//procedimiento para registrarnos
const register = async (req, res)=>{
    try {
        const email = req.body.email
        const pass = req.body.pass
        let passHash = await bcryptjs.hash(pass, 8)
        //console.log(passHash)
        conexion.query('INSERT INTO users SET ?', {email:email, pass:passHash}, (error, rows)=>{
            if(error){console.log(error)}
            res.json({Status : "Usuario creado"})
        })
    } catch (error) {
        console.log(error)
    }
}

const login = (req, res)=>{
        const email = req.body.email
        const pass = req.body.pass
        conexion.query('SELECT * FROM users WHERE user = ?', [user], async (error, rows)=>{
        if( rows.length == 0 || ! (await bcryptjs.compare(pass, rows[0].pass)) ){
            res.json(error)
        }else{
            //inicio de sesión OK
            const id = rows[0].id
            const token = jwt.sign({id:id}, "super_secret", {
                expiresIn: "7d"
            })
            //generamos el token SIN fecha de expiracion
            //const token = jwt.sign({id: id}, "super_secret")
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
            conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, rows)=>{
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