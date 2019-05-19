const express = require('express');

const router = express.Router();

const platoCtrl = require('../controllers/plato-controller');

// ../carta
router.post('/', platoCtrl.crearPlato);
//router.post('/imagen', platoCtrl.subirImagen);
router.get('/imagen', platoCtrl.getImagen);
router.get('/', platoCtrl.getPlatos);
router.get('/plato', platoCtrl.getPlato);
router.post('/updatePlato', platoCtrl.modificarPlato);
router.put('/deletePlato', platoCtrl.eliminarPlato);
router.get('/orden', platoCtrl.categoriaOrden);
router.get('/tipo', platoCtrl.categoriaTipo);
router.get('/platos/categoria', platoCtrl.platosCategoria);
router.get('/menu', platoCtrl.getMenu);
router.get('/sugerencias', platoCtrl.getSugerencias);




module.exports = router;