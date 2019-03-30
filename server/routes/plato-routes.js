const express = require('express');

const router = express.Router();

const platoCtrl = require('../controllers/plato-controller');

// ../carta
router.post('/', platoCtrl.crearPlato);
//router.post('/imagen', platoCtrl.subirImagen);
router.get('/imagen', platoCtrl.getImagen);
router.get('/', platoCtrl.getPlatos);
router.get('/plato', platoCtrl.getPlato);
router.get('/orden', platoCtrl.categoriaOrden);
router.get('/tipo', platoCtrl.categoriaTipo);
router.get('/platos/categoria', platoCtrl.platosCategoria);



module.exports = router;