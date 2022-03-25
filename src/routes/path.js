const express = require('express')
const router = express.Router()

const {register, login,checkToken, logout}= require('../controllers/authController')

//router para los métodos del controller
router.get('', checkToken)
router.post('/register', register)
router.post('',login)
router.get('/logout',checkToken, logout)

module.exports = router