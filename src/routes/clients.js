const express = require('express')
const router = express.Router()

const {mostrarClientes, crearCliente}= require('../controllers/clients')
const {checkToken}= require('../controllers/authController')
//router para los métodos del controller
router.get('',mostrarClientes)
router.post('/crear', checkToken, crearCliente)

module.exports = router