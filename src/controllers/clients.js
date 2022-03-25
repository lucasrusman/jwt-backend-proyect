const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database')
const {promisify} = require('util')

//Process to see al clients
const mostrarClientes = async (req, res)=>{
        conexion.query('SELECT * cliente', (error, rows)=>{
            console.log(rows)
            if(error){
                console.log(error)
            }else{
                res.json(rows)
            }
        })
}

const crearCliente = async (req, res)=>{
    const {nombre, telefono, zona, direccion, email, detalle} = req.body
    console.log(nombre, telefono, zona, direccion, email, detalle)

    conexion.query('INSERT INTO cliente (nombre, telefono, zona, direccion, email, detalle) VALUES (?, ?, ?, ?, ?, ?); ', [nombre, telefono, zona, direccion, email, detalle], (error, rows)=>{
        if(error){console.log(error)}
        res.json({Status : "Usuario registrado"})
    })
}

module.exports = {mostrarClientes, crearCliente}