const express = require('express');
const router = express.Router();


const usuarioCtrl = require('../controllers/usuario-controller');

//REGISTRO /usuario...
router.post('/registro', usuarioCtrl.registro);
router.post('/login', usuarioCtrl.login);
router.get('/', usuarioCtrl.getUsuarios);
router.get('/:id', usuarioCtrl.getUsuario);
router.put('/:id', usuarioCtrl.updateUsuario);


module.exports = router;