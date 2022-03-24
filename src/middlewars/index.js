

const validarCampos  = require('../middlewars/validar-campos')
const validarJWT  = require('../middlewars/validar-jwt')
const validarRoles  = require('../middlewars/validar-roles')


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles

}
