const express = require('express')
const router = express.Router()

const {mostrarClientes, crearCliente}= require('../controllers/clients')

//router para los métodos del controller
router.get('/clientes',mostrarClientes)
router.post('/clientes/crear', crearCliente)

module.exports = router