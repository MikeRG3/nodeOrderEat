const express = require('express');
const router = express.Router();


const sesionCtrl = require('../controllers/sesion-controller');

//SESION/...
router.post('/crear', sesionCtrl.crearSesion);
router.get('/', sesionCtrl.getSesion);
router.put('/cerrar', sesionCtrl.cerrarSesion);



module.exports = router;