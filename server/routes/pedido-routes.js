const express = require('express');
const router = express.Router();


const pedidoCtrl = require('../controllers/pedido-controller');

//PEDIDO/...
router.post('/', pedidoCtrl.crearPedido);
router.get('/', pedidoCtrl.getPedido);
router.get('/historial/:usuario', pedidoCtrl.getHistorial);
router.get('/encurso/:usuario', pedidoCtrl.getPedidoCurso);
// router.put('/cerrar', sesionCtrl.cerrarSesion);



module.exports = router;