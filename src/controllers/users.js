const {request , response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");