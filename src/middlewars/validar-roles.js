const { request, response} = require('express')


const adminRole = (req = request, res = response, next) =>{
    if(!req.usuario){
        return res.status(500).json({
            msg : 'Se quiere verificar el rol sin validar primero el token'
        })
    }

    const {rol, nombre} = req.usuario

    if (rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg : `${nombre} no es un usuario autorizado como administrador`
        })
    }
    next()
}


const tieneRole = (...roles) =>{

    return (req = request, res = response, next)=>{
        if(!req.usuario){
            return res.status(500).json({
                msg : 'Se quiere verificar el rol sin validar primero el token'
            })
        }
        if (!roles.includes(req.usuario.rol)){
            return res.status(500).json({
                msg : `Este servicio requiere uno de estos roles: ${roles}`
            })
        }

        next()
    }


}


module.exports = {
    adminRole,
    tieneRole
}