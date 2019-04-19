const express = require('express');
const router = express.Router();


const sesionCtrl = require('../controllers/sesion-controller');

//SESION/...
router.post('/crear', sesionCtrl.crearSesion);
router.get('/', sesionCtrl.getSesion);
router.get('/mesa/:mesa', sesionCtrl.getSesionMesa);
router.get('/liberar', sesionCtrl.liberar);
router.get('/liberar/mesa/:mesa', sesionCtrl.liberarMesa);
router.put('/cerrar', sesionCtrl.cerrarSesion);
router.get('/activa/:usuario', sesionCtrl.compruebaSesion);




module.exports = router;