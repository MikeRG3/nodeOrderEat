const express = require('express');
const router = express.Router();


const pedidoCtrl = require('../controllers/pedido-controller');

//PEDIDO/...
router.post('/', pedidoCtrl.crearPedido);
router.get('/', pedidoCtrl.getPedido);
router.get('/sesion/:sesion', pedidoCtrl.getPedidoSesion);
router.get('/pedidos', pedidoCtrl.getPedidos);
router.get('/historial/:usuario', pedidoCtrl.getHistorial);
router.get('/encurso/:usuario', pedidoCtrl.getPedidoCurso);
router.post('/estado/lineaPedido', pedidoCtrl.actualizarEstadoLineaPedido);
router.post('/estado/pedido', pedidoCtrl.actualizarEstadoPedido);
// router.put('/cerrar', sesionCtrl.cerrarSesion);



module.exports = router;