const Sesion = require('../models/sesion-model');
const Usuario = require('../models/usuario-model');
const sesionCtrl = {};
const usuarioCtrl = require('../controllers/usuario-controller');
const mesaCtrl = require('../controllers/mesa-controller');


sesionCtrl.getSesion = async(req, res) => {

    Sesion.find({})
        .populate('mesa')
        .exec((err, sesionDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }

            res.json({
                ok: true,
                sesionDB
            })
        })

};

sesionCtrl.crearSesion = async(req, res) => {
    let body = req.body;

    //Comprobamos que la mesa en la que se ha abierto sesion está libre u ocupada
    let mesaEstado = await mesaCtrl.mesaOcupada(body.mesa);

    if (mesaEstado == 'Libre') {
        //Si esta libre, la pasamos a ocupada y registramos la sesion,
        console.log("Ocupando mesa: ", await mesaCtrl.ocuparMesa(body.mesa));

        let sesion = new Sesion(body);

        //Si el usuario es la primera vez que utiliza la app, se crea un nuevo
        if (body.usuario == '') {
            //Creamos un usuario vacio
            usuario = new Usuario();

            await usuario.save((err, usuarioDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        error: err.message
                    });
                }
                usuario = usuarioDB;
            });
            //Modificamos el id de usuario que viene por defecto vacio, por el nuevo generado
            sesion.usuario = usuario._id;


        }
        //Si el usuario está registrado, en el body ya se encuentra el id, asi que almacenamos los datos de la sesion

        await sesion.save((err, sesionDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }

            res.json({
                ok: true,
                sesionDB
            });
        })
    } else {
        res.json({
            ok: false,
            message: "Mesa ocupada"
        })
    }

    //Si el usuario ya está registrado, se utiliza su id almacenado

    //usuarioCtrl.registroAnonimo(req);
    // console.log(usuario);

};

sesionCtrl.cerrarSesion = async(req, res) => {

    let body = req.body;
    let cerrar = new Promise((resolve, reject) => {
            Sesion.findOneAndUpdate({ _id: body.sesion }, { estado: "Cerrada" }, { new: true }, (err, sesionDB) => {
                if (err) {
                    reject(false)
                }

                resolve(sesionDB.estado)
            })
        }

    )

    let liberarMesa = await mesaCtrl.liberarMesa(body.mesa);
    let cierraSesion = await cerrar;
    res.json({
        sesion: cierraSesion,
        mesa: liberarMesa
    })

};

// sesionCtrl.cierraSesion = (id) =>(
//     new Promise(
//         //     Sesion.findOneAndUpdate({ _id: sesion }, { estado: "Cerrada" }, (err, sesionDB) => {
//         //         if (err) {
//         //             return res.status(400).json({
//         //                 ok: false,
//         //                 error: err.message
//         //             });
//         //         }

//         //         resolve(true)
//         //     })
// )

module.exports = sesionCtrl;