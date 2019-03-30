const express = require('express');

const router = express.Router();

const mesaCtrl = require('../controllers/mesa-controller');

router.post('/:numero', mesaCtrl.crearMesa);
router.get('/', mesaCtrl.getMesas);


module.exports = router;