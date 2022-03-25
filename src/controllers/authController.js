const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database')

//Process to register
const register =  async(req, res)=>{
        const {email, pass} = req.body;
        let passHash = await bcryptjs.hash(pass, 10)
        conexion.query('INSERT INTO usuario (email, pass) VALUES (?, ?); ', [email, passHash], (error, rows)=>{
            if(error){console.log(error)}
            res.json({Status : "Usuario registrado"})
        })
}

const checkToken = (req, res, next)=>{
    if (req.cookies.jwt) {
        token = req.cookies.jwt
        const decodificada = jwt.verify(token, "super_secret")
        conexion.query('SELECT * FROM usuario WHERE email = ? AND pass = ?', [decodificada.email,decodificada.pass], (error, rows)=>{
            if(!rows){
                console.log(error)
            }
            return next()
        })
    }else{
        res.json({Status : "Token no activo"})
    }
}
const login = async(req, res)=>{
    try {
        const {email, pass} = req.body
        //si no te manda email o pass
        if(!email || !pass){
            res.json({Status : "Ingrese el email y/o password"})
        }else{
            conexion.query('SELECT * FROM usuario WHERE email = ?', [email], async(error, rows)=>{
                if( rows.length == 0 || !(await bcryptjs.compare(pass, rows[0].pass)) ){
                    res.json({Status : "Email y/o password incorrectos"})
                }else{
                    //inicio de sesión OK
                    const email = rows[0].email
                    const pass = rows[0].pass
                    const token = jwt.sign({email, pass}, "super_secret", {
                        expiresIn: "40s"
                    })
                    console.log("TOKEN: "+token+" para el Email : "+email)
                    const cookiesOptions = {
                        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                        httpOnly: true
                        }
                    res.cookie('jwt', token, cookiesOptions)
                    res.json({Status : "Login correcto"})
            }
        })
        }
        
    } catch (error) {
        console.log(error)
    }

}




const logout = (req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('')
}


module.exports = {register, login,checkToken ,logout}