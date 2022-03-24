const {request , response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");



const usuariosPost = async(req= request, res = response) => {

    const { correo, password} = req.body
    const usuario = new Usuario({correo, password})
    //verificar si el correo existe
    

    //encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //guardar en DB
    await usuario.save()

    res.json({
        usuario
    })
    }

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    res.json({usuario})
}




module.exports = {
    usuariosDelete,
    usuariosPost,
}