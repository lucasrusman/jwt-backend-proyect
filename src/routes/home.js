const { Router } = require('express')
const router = Router()

const { check } = require("express-validator")

const { validarJWT } = require('./middlewars/validar-jwt')

app.get("/jwt/home", validarJWT)
