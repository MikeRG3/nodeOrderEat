const express = require('express');
const router = express.Router();


const usuarioCtrl = require('../controllers/usuario-controller');

//REGISTRO /usuario...
router.post('/registro', usuarioCtrl.registro);
router.post('/update', usuarioCtrl.updateUsuario);

router.post('/login', usuarioCtrl.login);
router.get('/', usuarioCtrl.getUsuarios);
router.get('/:id', usuarioCtrl.getUsuario);



module.exports = router;