const { Router } = require('express')
const router = Router()

const { check } = require("express-validator")

const { validarJWT } = require('./middlewars/validar-jwt')
const {
    usuariosDelete,
    usuariosPost,
} = require ("../controllers/users")

app.get("/api", function (req, res) {
    res.json({
        msg: "hola"
    })
})



//ruta de registro
router.post('/api/registro',[
    check('nombre', 'El nombre no es valido').notEmpty(),
    check('password', 'El password no es valido').isLength({min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeMail),
    check( 'rol').custom( esRoleExist ),
    validarCampos
], usuariosPost)



router.delete('/:id',[
    validarJWT,

    // El siguiente middleware perimite eliminar a aquellos que sean 'ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE' o 'MANAGER_ROLE'
    check('id').custom(esUsuarioMongo),
    validarCampos
],usuariosDelete)



module.exports = router