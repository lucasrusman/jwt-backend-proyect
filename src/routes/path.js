const express = require('express')
const router = express.Router()

const {register, login, isAuthenticated, logout}= require('../controllers/authController')

//router para los métodos del controller
router.post('/register', register)
router.post('', login)
router.get('/logout', logout)

module.exports = router