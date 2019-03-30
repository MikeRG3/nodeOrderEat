const express = require('express');
const router = express.Router();


const pedidoCtrl = require('../controllers/pedido-controller');

//SESION/...
router.post('/', pedidoCtrl.crearPedido);
router.get('/', pedidoCtrl.getPedido);
// router.put('/cerrar', sesionCtrl.cerrarSesion);



module.exports = router;