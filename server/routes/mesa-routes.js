const express = require('express');

const router = express.Router();

const mesaCtrl = require('../controllers/mesa-controller');

router.post('/:numero', mesaCtrl.crearMesa);
router.get('/', mesaCtrl.getMesas);
router.get('/mesas', mesaCtrl.cargarMesas);


module.exports = router;